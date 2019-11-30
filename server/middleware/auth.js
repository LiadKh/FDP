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
    next(new HttpErrorHandler(401, `Not authorized to access this resource ${error}`));
  }
};

const adminAuth = async (req, res, next) => {
  try {
    auth(req, res, next);
    if (!req.user.isAdmin) {
      throw new Error('Not authorized to access this resource');
    }
    next();
  } catch (error) {
    log(error);
    next(new HttpErrorHandler(401, error.toString()));
  }
};

const notAdminAuth = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      throw new Error(
        'Not authorized to access this resource',
      );
    }
    next();
  } catch (error) {
    log(error);
    next(new HttpErrorHandler(401, error.toString()));
  }
};

const managerAuth = async (req, res, next) => {
  try {
    if (!req.user.isManager) {
      throw new Error('Not authorized to access this resource');
    }
    next();
  } catch (error) {
    log(error);
    next(new HttpErrorHandler(401, error));
  }
};

const technicalWriterAuth = async (req, res, next) => {
  try {
    if (req.user.isManager || req.user.isAdmin) {
      throw new Error('Not authorized to access this resource');
    }
    next();
  } catch (error) {
    log(error);
    next(new HttpErrorHandler(401, error.toString()));
  }
};


module.exports = {
  auth,
  adminAuth,
  notAdminAuth,
  managerAuth,
  technicalWriterAuth,
};
