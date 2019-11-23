var express = require('express');
var router = express.Router();
var company = require('../mongo/models/company.model')
var user = require('../mongo/models/user.model')
const Transaction = require("mongoose-transactions");

/** get all the company that exists in the system. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

/** create new company */
router.post('/company', async function (req, res, next) {
  let newCompany = req.body.company
  let newManager = req.body.manager
  if (!newCompany || !newCompany)
    res.status(400).send('invalid data');
  const transaction = new Transaction();
  try {
    //TODO remove the property of isAdmin
    let companyId = transaction.insert('company', newCompany);
    let managerId = transaction.insert('user', newManager);
    transaction.update(person, jonathanId, aliceObject);

    const final = await transaction.run();
    res.status(200).send('new company and manager have created successfully');
  } catch (error) {
    console.error(error);
    const rollbackObj = await transaction.rollback().catch(console.error);
    transaction.clean();
    res.status(500).send("there is a problem while the system tried to register new company and manager");
  }
});

module.exports = router;
