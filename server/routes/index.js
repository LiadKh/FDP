const express = require('express');

const router = express.Router();
const admin = require('./admin');
const company = require('./company');
const auth = require('./auth');
const user = require('./user');


router.use('/', auth);
router.use('/admin', admin);
router.use('/user', user);
router.use('/company', company);

module.exports = router;
