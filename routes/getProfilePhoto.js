const express = require('express');
const User = require('../modals/User');
const passwordHandler = require('../controllers/_passwordHandler');
const _usernameHandler = require('../controllers/_usernameHandler');
const router = express.Router();

// const signinHandler = require('../controllers/_signinHandler');

// Handle the POST request for initial username submission
router.get('/', async (req, res) => {
  const username = req.user.username; // Replace with how you get the username
  const user = await User.find({ username:username });

  if (user && user.profilePhoto) {
    res.set('Content-Type', 'image/jpeg'); // Set the correct content type
    res.send(user.profilePhoto);
  } else {
    // Send a default placeholder image if the user has no profile photo
    // Replace 'default.jpg' with your actual default image path
    res.sendFile('F:/PROGRAMING/WEB DEVELOPMENT/SocietySync/public/resources/user.jpg');
  }
});


function convertUsername(username) {
  const building = username.charAt(0).toUpperCase(); // Convert first character to uppercase
  const flatNumber = username.slice(1, 2); // Get characters 2 and 3
  const rest = username.slice(2); // Get the rest of the characters

  return `${building}-${flatNumber}/${rest}`;
}

module.exports = router;