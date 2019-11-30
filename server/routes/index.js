const express = require('express');

const router = express.Router();
const admin = require('./admin');
const company = require('./company');

router.use('/admin', admin);
router.use('/company', company);

module.exports = router;
