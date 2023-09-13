const express = require('express');
const user = require('../modals/User');
const passwordHandler = require('../controllers/_passwordHandler');
const _usernameHandler = require('../controllers/_usernameHandler');
const router = express.Router();

// const signinHandler = require('../controllers/_signinHandler');

// Handle the POST request for initial username submission
router.post('/',async (req, res) => {
  console.log("post to handle password")
  passwordHandler(req,res,user)
});

function convertUsername(username) {
  const building = username.charAt(0).toUpperCase(); // Convert first character to uppercase
  const flatNumber = username.slice(1, 2); // Get characters 2 and 3
  const rest = username.slice(2); // Get the rest of the characters

  return `${building}-${flatNumber}/${rest}`;
}

module.exports = router;
