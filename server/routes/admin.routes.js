const express = require('express');

const router = express.Router();
const Transaction = require('mongoose-transactions');
const modelsNames = require('../mongo/models/models.names');

/** get all the company that exists in the system. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Express',
  });
});

/** create new company */
router.post('/company', async (req, res, next) => {
  const newCompany = req.body.company;
  const newManager = req.body.manager;
  if (!newCompany || !newCompany) res.status(400).send('invalid data');
  const transaction = new Transaction();
  try {
    // TODO remove the property of isAdmin
    const companyId = transaction.insert(modelsNames.company, newCompany);
    const managerId = transaction.insert(modelsNames.user, newManager);
    transaction.update(modelsNames.user, managerId, {
      $set: {
        company: companyId,
      },
    });
    transaction.update(modelsNames.company, companyId, {
      $push: {
        managers: managerId,
      },
    });

    const final = await transaction.run();
    res.status(200).send('new company and manager have created successfully');
  } catch (error) {
    console.error(error);
    const rollbackObj = await transaction.rollback().catch(console.error);
    transaction.clean();
    res
      .status(500)
      .send(
        'there is a problem while the system tried to register new company and manager',
      );
  }
});

module.exports = router;
