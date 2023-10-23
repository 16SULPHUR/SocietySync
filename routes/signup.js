const express = require('express');
const user = require('../modals/User');
const maintenance = require('../modals/Maintenance');
const signupHandler = require('../controllers/_signupHandler');
const router = express.Router();

router.post('/', (req, res) => {
  signupHandler(req,res,user,maintenance)
}).get("/",(req,res)=>{
    res.send("Get request to signup page")
});

module.exports = router;
