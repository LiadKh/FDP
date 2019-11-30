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

/** create new manager in the company. */
router.post('/', managerAuth, (req, res, next) => {
  const {
    manager,
  } = req.body;
  if (!manager) throw new HttpErrorHandler(400, 'need the manager to specify in the request');

  delete manager.isAdmin;
  manager.company = req.user.company;
  const user = new User(manager);
  user.save((err) => {
    if (err) {
      log(err);
      next(new HttpErrorHandler(400, err));
    } else {
      res.send('new manager has been created successfully');
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
module.exports = router;
