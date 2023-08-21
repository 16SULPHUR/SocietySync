const express = require('express');
const router = express.Router();
const user = require('../modals/User');
const signinHandler = require('../controllers/_signinHandler');

// Handle the POST request for initial username submission
router.post('/', (req, res) => {
  signinHandler(req, res, user);
});

// Render the password setup page (GET request)
router.get('/', (req, res) => {
  res.render('password');
});

module.exports = router;
