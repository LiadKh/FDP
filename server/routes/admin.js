const express = require('express');
const log = require('debug')('ADMIN');
const Transaction = require('mongoose-transactions');
const {
  HttpErrorHandler,
} = require('../lib/error');

const router = express.Router();

const Company = require('../mongo/models/company');
const User = require('../mongo/models/user');
const modelsNames = require('../mongo/models/models.names');

/** create new admin. */
router.post('/', (req, res, next) => {
  const {
    admin,
  } = req.body;
  if (!admin) throw new HttpErrorHandler(400, 'invalid admin data');

  admin.isAdmin = true;
  User.create(admin).then((user) => {
    res.status(200).send(user);
  }).catch((error) => {
    log(error);
    next(next(new HttpErrorHandler(500, error)));
  });
});

/** get companies - pagination -> page and size. */
router.get('/company', (req, res, next) => {
  let {
    page,
    size,
  } = req.params;

  if (!page) {
    page = 1;
  }
  if (!size) {
    size = 5;
  }

  Company.paginate({}, {
    page,
    limit: size,
  }, (err, result) => {
    if (err) {
      log(err);
      next(new HttpErrorHandler(500, err));
    } else {
      res.send(result.docs);
    }
  });
});

/** create new company */
router.post('/company', async (req, res, next) => {
  const {
    company,
    manager,
  } = req.body;
  if (!company || !manager) next(new HttpErrorHandler(400, 'invalid data'));

  const transaction = new Transaction();

  try {
    delete manager.isAdmin;
    const managerId = transaction.insert(modelsNames.user, manager);
    company.manager = [];
    company.manager.push(managerId);
    const companyId = transaction.insert(modelsNames.company, company);
    transaction.update(modelsNames.user, managerId, {
      $set: {
        company: companyId,
      },
    });
  } catch (error) {
    log(error);
    await transaction.rollback().catch(log);
    transaction.clean();
    next(new HttpErrorHandler(404, error));
  }

  try {
    const final = await transaction.run();
    log(final);
    res.status(200).send('new company and manager have created successfully');
  } catch (error) {
    log(error);
    await transaction.rollback().catch(log);
    transaction.clean();
    next(new HttpErrorHandler(500, error));
  }
});

/** get all the admins that exists in the system. */
router.get('/allAdmins', (req, res, next) => {
  let {
    page,
    size,
  } = req.params;

  if (!page) {
    page = 1;
  }
  if (!size) {
    size = 5;
  }

  User.paginate({
    isAdmin: true,
  }, {
    page,
    limit: size,
  }, (err, result) => {
    if (err) {
      log(err);
      next(new HttpErrorHandler(500, err));
    }
    res.send(result.docs);
  });
});

module.exports = router;
