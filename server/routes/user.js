const express = require('express');

const auth = require('../middleware/auth');

const router = express.Router();

/** user profile */
router.get('/me', auth, (req, res) => {
  res.send(req.user);
});

module.exports = router;
