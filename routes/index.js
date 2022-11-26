const express = require('express');
const router = express.Router();
const dir = { root: __dirname + "/../src" }

// Pages that do not require login
router.get(['/', '/feed', '/project\?*'], function(req, res, next) {
  res.sendFile('index.html', dir);
});

// Pages that require login
router.get(['/dashboard', '/canvas\?*'], function(req, res, next) {
  res.sendFile('index.html', dir);
});

// Pages that require logout
router.get('/register', function(req, res, next) {
  res.sendFile('index.html', dir);
});

module.exports = router;
