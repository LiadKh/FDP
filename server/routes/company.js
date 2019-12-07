const express = require('express');
const log = require('debug')('COMPANY');

const {
  HttpErrorHandler,
} = require('../lib/error');
const {
  auth,
  notAdminAuth,
} = require('../middleware/auth');

const router = express.Router();

const Project = require('../mongo/models/project');

router.use(auth);

/** get projects of my company - pagination -> page and size. */
router.get('/projects', notAdminAuth, (req, res, next) => {
  let {
    page,
    size,
  } = req.params;

  if (!page) {
    page = 0;
  }
  if (!size) {
    size = 5;
  }

  const op = {
    company: req.user.company,
  };

  if (!req.user.isManager) {
    // eslint-disable-next-line no-underscore-dangle
    op.users = req.user._id;
  }

  Project.find(op).skip(page * size).limit(size).exec((err, docs) => {
    if (err) {
      log(err);
      next(new HttpErrorHandler(500, err));
    } else {
      res.send(docs);
    }
  });
});

module.exports = router;
