const express = require('express');
const log = require('debug')('COMPANY');
const {
  HttpErrorHandler,
} = require('../lib/error');

const router = express.Router();

const Company = require('../mongo/models/company');
// const User = require('../mongo/models/user');
const Project = require('../mongo/models/project');
// const modelsNames = require('../mongo/models/models.names');

/** get projects of a company - pagination -> page and size. */
router.get('/:name', (req, res, next) => {
  const {
    name,
  } = req.params;

  if (!name) throw new HttpErrorHandler(400, 'missing the name of the company');

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

  Company.findOne({
    name,
  }, (err, company) => {
    if (err) next(new HttpErrorHandler(500, err));
    Project.paginate({
      company,
    }, {
      page,
      limit: size,
    }, (errProject, result) => {
      if (err) {
        next(new HttpErrorHandler(500, errProject));
      }
      res.send(result.docs);
    });
  });
});

module.exports = router;
