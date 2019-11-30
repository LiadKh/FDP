/* eslint-disable require-atomic-updates */
/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const log = require('debug')('AUTH-MIDDLEWARE');

const User = require('../mongo/models/user');

const {
  HttpErrorHandler,
} = require('../lib/error');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const data = jwt.verify(token, process.env.JWT_KEY);

    const user = await User.findOne({
      _id: data._id,
      'tokens.token': token,
    });
    if (!user) {
      next(new HttpErrorHandler(404, 'User doesn\'t found'));
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    log(error);
    next(new HttpErrorHandler(404, 'Not authorized to access this resource'));
  }
};

module.exports = auth;
