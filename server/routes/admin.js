const express = require('express');
const log = require('debug')('ADMIN');
const Transaction = require('mongoose-transactions');

const router = express.Router();

const Company = require('../mongo/models/company');
const User = require('../mongo/models/user');
const Project = require('../mongo/models/project');
const modelsNames = require('../mongo/models/models.names');

/** get all the users that exists in the system. */
router.get('/', (req, res, next) => {
  User.find({
    admin: true,
  }, (err, data) => {
    if (err) {
      log(err);
      res.status(500).send(err);
    }
    res.send(data);
  });
});

/** create new admin. */
router.post('/', async (req, res) => {
  const newAdmin = req.body.admin;
  if (!newAdmin) res.status(400).send('invalid data');

  newAdmin.admin = true;
  User.create(newAdmin).then((user) => {
    res.status(200).send(user);
  }).catch((error) => {
    log(error);
    res.status(500).send('there is a problem while the system has tried to create new admin');
  });
});

/** get all the companies that exists in the system. */
router.get('/company', (req, res, next) => {
  Company.find({}, (err, data) => {
    if (err) {
      log(err);
      res.status(500).send(err);
    }
    res.send(data);
  });
});

/** create new company */
router.post('/company', async (req, res) => {
  const newCompany = req.body.company;
  const newManager = req.body.manager;
  if (!newCompany || !newCompany) res.status(400).send('invalid data');
  const transaction = new Transaction();
  try {
    delete newManager.admin;
    const managerId = transaction.insert(modelsNames.user, newManager);
    newCompany.manager = [];
    newCompany.manager[0] = managerId;
    const companyId = transaction.insert(modelsNames.company, newCompany);
    transaction.update(modelsNames.user, managerId, {
      $set: {
        company: companyId,
      },
    });

    const final = await transaction.run();
    log(final);
    res.status(200).send('new company and manager have created successfully');
  } catch (error) {
    log(error);
    await transaction.rollback().catch(log);
    transaction.clean();
    res.status(500).send('there is a problem while the system has tried to register new company/manager');
  }
});

// /** get all the users that exists in the system. */
// router.get('/user', (req, res, next) => {
//   User.find({}, (err, users) => {
//     if (err) {
//       log(err);
//       res.status(500).send(err);
//     }
//     res.send(users);
//   });
// });

// /** get all the projects of a company. */
// router.get('/company/:name/project', (req, res, next) => {
//   const name = req.param('name');
//   Company.findOne({
//     name,
//   }, (err, company) => {
//     if (err) {
//       log(err);
//       res.status(500).send(err);
//     }
//     Project.find({
//       company,
//     }, (errP, projects) => {
//       if (errP) {
//         log(errP);
//         res.status(500).send(errP);
//       }
//       res.send(projects);
//     });
//   });
// });

/** get all the projects of a company. */
router.get('/company/:id/project', (req, res, next) => {
  const company = req.param('id');
  Project.find({
    company,
  }, (errP, projects) => {
    if (errP) {
      log(errP);
      res.status(500).send(errP);
    }
    res.send(projects);
  });
});

module.exports = router;
