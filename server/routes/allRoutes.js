const express = require('express');

const router = express.Router();
const admin = require('./admin.routes');

router.use('/admin', admin);

module.exports = router;
