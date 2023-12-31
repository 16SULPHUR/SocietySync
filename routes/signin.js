const express = require('express');
const user = require('../modals/User');
const signinHandler = require('../controllers/_signinHandler');
const _usernameHandler = require('../controllers/_usernameHandler');
const router = express.Router();

// Handle the POST request for initial username submission
router.post('/', (req, res) => {
  signinHandler(req, res, user);
});

// Render the username input page (GET request)
router.get("/username", (req, res) => {
  console.log("Get request to username input page");
  res.render("username");
});

router.post("/password", (req, res) => {
  _usernameHandler(req,res,user);
});

router.get("/password", (req, res) => {
  console.log("Get request to password input page");
  res.render("password");
});

// router.get("/password", (req, res) => {
//   console.log("Get request to password input page");
//   res.render("password");
// });

module.exports = router;
