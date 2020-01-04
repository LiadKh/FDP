const log = require('debug')('AUTH');
const express = require('express');
const User = require('../../mongo/models/user');
const { auth } = require('../../middleware/auth');
const { HttpErrorHandler } = require('../../lib/error');

const router = express.Router();

/** login */
router.patch('/login', async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			next(new HttpErrorHandler(400, 'missing email or password'));
		} else {
			const user = await User.findByCredentials(email, password);
			// if (!user) {
			//   const err = 'Login failed! Check authentication credentials';
			//   log(err);
			//   next(new HttpErrorHandler(401, err));
			// } else {
			const token = await user.generateAuthToken();
			res.status(201).send({
				user,
				token
			});
		}
	} catch (error) {
		log(error);
		next(new HttpErrorHandler(401, error));
	}
});

/** logout current device */
router.patch('/logout', auth, async (req, res, next) => {
	try {
		req.user.tokens = req.user.tokens.filter(
			token => token.token !== req.token
		);
		await req.user.save();
		res.send();
	} catch (error) {
		next(new HttpErrorHandler(500, error));
	}
});

/** logout out of all device */
router.patch('/logoutAll', auth, async (req, res, next) => {
	try {
		req.user.tokens.splice(0, req.user.tokens.length);
		await req.user.save();
		res.send();
	} catch (error) {
		next(new HttpErrorHandler(500, error));
	}
});

module.exports = router;
