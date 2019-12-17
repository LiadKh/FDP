const express = require('express');
const log = require('debug')('PROFILE');

const {
  auth,
} = require('../../middleware/auth');

const router = express.Router();
const User = require('../../mongo/models/user');
const {
  HttpErrorHandler,
} = require('../../lib/error');

/** user profile */
router.get('/me', auth, (req, res) => {
  res.send(req.user);
});

/** update profile details */
router.patch('/me', auth, async (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  if (!name && !email && !password) next(new HttpErrorHandler(400, 'missing new user to update'));

  const user = {
    name,
    email,
    password,
  };

  const allowed = ['name', 'email', 'password'];

  const filtered = Object.keys(user)
    .filter((key) => typeof user[key] !== 'undefined')
    .filter((key) => allowed.includes(key))
    .reduce((obj, key) => {
      // eslint-disable-next-line no-param-reassign
      obj[key] = user[key];
      return obj;
    }, {});

  User.updateOne({
    email: req.user.email,
  }, {
    $set: filtered,
  }, (err, doc) => {
    if (err || (!doc.ok && !doc.nModified)) {
      log(err);
      next(new HttpErrorHandler(400, err));
    } else res.send(doc);
  });
});

module.exports = router;
