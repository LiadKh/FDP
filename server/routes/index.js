const express = require('express');

const router = express.Router();
const admin = require('./api/admin');
const company = require('./api/company');
const auth = require('./api/auth');
const user = require('./api/user');
const manager = require('./api/manager');


router.use('/', auth);
router.use('/admin', admin);
router.use('/user', user);
router.use('/manager', manager);
router.use('/company', company);

module.exports = router;
