const express = require('express');
const log = require('debug')('ADMIN');
const Transaction = require('mongoose-transactions');

const {
  HttpErrorHandler,
} = require('../../lib/error');
const {
  auth,
  adminAuth,
} = require('../../middleware/auth');

const router = express.Router();

const Company = require('../../mongo/models/company');
const User = require('../../mongo/models/user');
const modelsNames = require('../../mongo/models/models.names');

router.use(auth);
router.use(adminAuth);

/** get all the admins that exists in the system. */
router.get('/', async (req, res, next) => {
  let {
    page,
    size,
  } = req.query;

  if (!page) {
    page = 0;
  }
  if (!size) {
    size = 5;
  }

  User.find({
    isAdmin: true,
  }).skip(page * size).limit(size).exec((err, docs) => {
    if (err) {
      log(err);
      next(new HttpErrorHandler(500, err));
    } else {
      res.send(docs);
    }
  });
});

/** create new admin. */
router.post('/', async (req, res, next) => {
  const {
    admin,
  } = req.body;
  if (!admin) next(new HttpErrorHandler(400, 'invalid admin data'));
  else {
    admin.isAdmin = true;
    User.create(admin).then((user) => {
      res.status(200).send(user);
    }).catch((error) => {
      log(error);
      next(new HttpErrorHandler(500, error));
    });
  }
});

/** get companies - pagination -> page and size. */
router.get('/company', async (req, res, next) => {
  let {
    page,
    size,
    name,
  } = req.query;

  if (!page) {
    page = 0;
  }
  if (!size) {
    size = 5;
  }

  if (!name) {
    name = '';
  }

  Company.find({
    name: {
      $regex: name,
    },
  }).skip(page * size).limit(size).exec((err, docs) => {
    if (err) {
      log(err);
      next(new HttpErrorHandler(500, err));
    } else {
      res.send(docs);
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
  else {
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
  }
});

/** delete a company. */
router.delete('/company/:id', async (req, res, next) => {
  res.send();
  const {
    id,
  } = req.params;

  if (!id) next(new HttpErrorHandler(400, 'missing company id'));
  else {
    try {
      await Company.deleteCompany(id);
      res.send();
    } catch (error) {
      log(error);
      next(new HttpErrorHandler(400, error));
    }
  }
});

module.exports = router;
