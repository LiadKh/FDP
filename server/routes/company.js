const express = require('express');
const log = require('debug')('COMPANY');

const {
  HttpErrorHandler,
} = require('../lib/error');
const {
  auth,
  adminAuth,
  notAdminAuth,
} = require('../middleware/auth');

const router = express.Router();

const Company = require('../mongo/models/company');
const Project = require('../mongo/models/project');

router.use(auth);

/** get projects of a company - pagination -> page and size. */
router.get('/:name', adminAuth, (req, res, next) => {
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
    if (err) {
      log(err);
      next(new HttpErrorHandler(500, err));
    } else {
      Project.paginate({
        company,
      }, {
        page,
        limit: size,
      }, (errProject, result) => {
        if (err) {
          next(new HttpErrorHandler(500, errProject));
        } else {
          res.send(result.docs);
        }
      });
    }
  });
});


/** get projects of my company - pagination -> page and size. */
router.get('/', notAdminAuth, (req, res, next) => {
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
  const id = req.user.company;
  Company.findById(id, (err, company) => {
    if (err) {
      log(err);
      next(new HttpErrorHandler(500, err));
    } else {
      Project.paginate({
        company,
      }, {
        page,
        limit: size,
      }, (errProject, result) => {
        if (err) {
          next(new HttpErrorHandler(500, errProject));
        } else {
          res.send(result.docs);
        }
      });
    }
  });
});

module.exports = router;
