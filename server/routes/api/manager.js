const express = require('express');
const log = require('debug')('MANAGER');

const { HttpErrorHandler } = require('../../lib/error');
const { auth, managerAuth } = require('../../middleware/auth');

const router = express.Router();
const User = require('../../mongo/models/user');
const Project = require('../../mongo/models/project');

router.use(auth);

/** get users in the company. */
router.get('/users', managerAuth, async (req, res, next) => {
	let { size, page } = req.query;

	const { manager } = req.query;

	if (!page) {
		page = 0;
	}
	if (!size) {
		size = 5;
	}
	const op = {};
	op.company = req.user.company;

	if (typeof manager !== 'undefined') {
		op.isManager = manager;
	}

	User.find(op)
		.skip(page * size)
		.limit(size)
		.exec((err, docs) => {
			if (err) {
				log(err);
				next(new HttpErrorHandler(500, err));
			} else {
				res.send(docs);
			}
		});
});

/** create new user in the company. */
router.post('/', managerAuth, async (req, res, next) => {
	const { user } = req.body;
	if (!user)
		next(new HttpErrorHandler(400, 'need to specify the user in the request'));

	delete user.isAdmin;
	user.company = req.user.company;
	const newUser = new User(user);
	newUser.save(err => {
		if (err) {
			log(err);
			next(new HttpErrorHandler(400, err));
		} else {
			res.send(newUser);
		}
	});
});

/** create new project. */
router.post('/project/:name', managerAuth, async (req, res, next) => {
	const { name } = req.params;

	Project.create(
		{
			name,
			company: req.user.company
		},
		(err, project) => {
			if (err) {
				log(err);
				next(new HttpErrorHandler(400, err));
			} else {
				res.send(project);
			}
		}
	);
});

/** assign technical editor to project. */
router.get('/project/:projectId/users', managerAuth, async (req, res, next) => {
	const { projectId } = req.params;

	let { size, page } = req.query;

	if (!page) {
		page = 0;
	}
	if (!size) {
		size = 5;
	}
	const { company } = req.user;

	const op = {
		_id: projectId,
		company
	};

	const select = {
		users: {
			$slice: [page * size, size]
		},
		select: 'users'
	};

	Project.find(op, select)
		.populate('users')
		.exec((err, docs) => {
			if (err) {
				next(new HttpErrorHandler(400, err));
			} else {
				res.send(docs[0].users);
			}
		});
});

/** assign technical editor to project. */
router.put(
	'/project/:projectId/user/:userId',
	managerAuth,
	async (req, res, next) => {
		const { projectId, userId } = req.params;

		const project = await Project.findById(projectId);
		if (!project || project.company.str !== req.user.company.str) {
			next(new HttpErrorHandler(404, 'Project not found'));
		} else {
			const user = await User.findById(userId);
			if (!user || !user.company || user.company.str !== req.user.company.str) {
				next(new HttpErrorHandler(404, 'User not found'));
			}
			if (user.isManager) {
				next(new HttpErrorHandler(400, "Manager can't be assign to project"));
			} else {
				try {
					await project.assignUser(userId);
					res.send();
				} catch (error) {
					log(error);
					next(new HttpErrorHandler(400, error.stack));
				}
			}
		}
	}
);

/** remove technical editor from project. */
router.delete(
	'/project/:projectId/user/:userId',
	managerAuth,
	async (req, res, next) => {
		const { projectId, userId } = req.params;

		const project = await Project.findById(projectId);
		if (!project || project.company.str !== req.user.company.str) {
			next(new HttpErrorHandler(404, 'Project not found'));
		} else {
			const user = await User.findById(userId);
			if (!user || !user.company || user.company.str !== req.user.company.str) {
				next(new HttpErrorHandler(404, 'User not found'));
			} else {
				try {
					await project.removeUser(userId);
					res.send();
				} catch (error) {
					log(error);
					next(new HttpErrorHandler(400, error.stack));
				}
			}
		}
	}
);

/** delete company user. */
router.delete('/delete/:id', managerAuth, async (req, res, next) => {
	const { id } = req.params;

	if (!id) {
		next(new HttpErrorHandler(400, 'missing user id'));
	}
	try {
		// eslint-disable-next-line no-underscore-dangle
		if (req.user._id.toString() === id) {
			const count = await User.count({
				company: req.user.company,
				isManager: true
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
