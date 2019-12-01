const express = require('express');
const log = require('debug')('MANAGER');

const {
  HttpErrorHandler,
} = require('../lib/error');
const {
  auth,
  managerAuth,
} = require('../middleware/auth');

const router = express.Router();
const User = require('../mongo/models/user');
const Project = require('../mongo/models/project');

router.use(auth);

/** create new user in the company. */
router.post('/', managerAuth, (req, res, next) => {
  const {
    user,
  } = req.body;
  if (!user) throw new HttpErrorHandler(400, 'need to specify the user in the request');

  delete user.isAdmin;
  user.company = req.user.company;
  if (typeof user.isManager === 'undefined') {
    user.isManager = false;
  }
  const newUser = new User(user);
  newUser.save((err) => {
    if (err) {
      log(err);
      next(new HttpErrorHandler(400, err));
    } else {
      res.send(`new ${newUser.isManager ? 'manager' : 'technical editor'} has been created successfully`);
    }
  });
});

/** create new project of the manager company. */
router.post('/project/:name', managerAuth, async (req, res, next) => {
  const {
    name,
  } = req.params;

  if (!name) {
    next(new HttpErrorHandler(400, 'missing new project name'));
  }
  await Project.create({
    name,
    company: req.user.company,
  }, (err, project) => {
    if (err) {
      log(err);
      next(new HttpErrorHandler(400, err));
    } else {
      res.send(project);
    }
  });
});

/** get users in the company. */
router.get('/users', managerAuth, async (req, res, next) => {
  const {
    isManager,
  } = req.query;

  let {
    size,
    page,
  } = req.params;

  if (!page) {
    page = 1;
  }
  if (!size) {
    size = 5;
  }
  const op = {};
  op.company = req.user.company;

  if (typeof isManager !== 'undefined') {
    op.isManager = isManager;
  }

  User.paginate(op, {
    page,
    limit: size,
  }, (err, result) => {
    if (err) {
      log(err);
      next(new HttpErrorHandler(500, err));
    } else {
      res.send(result.docs);
    }
  });
});

/** delete company user. */
router.delete('/delete/:id', managerAuth, async (req, res, next) => {
  const {
    id,
  } = req.params;

  if (!id) {
    next(new HttpErrorHandler(400, 'missing user id'));
  }
  try {
    // eslint-disable-next-line no-underscore-dangle
    if (req.user._id.toString() === id) {
      const count = await User.count({
        company: req.user.company,
        isManager: true,
      });
      if (count === 1) {
        const message = 'try to delete the last manager in the company';
        log(message);
        throw new Error(message.toString());
      }
    }
    res.send();
    // eslint-disable-next-line no-underscore-dangle
    await User.deleteUser(req.user.company, id);
    res.send();
  } catch (error) {
    log(error.message);
    next(new HttpErrorHandler(400, error.message));
  }
});

module.exports = router;
