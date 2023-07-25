const express = require('express');
const user = require('../modals/User');
const signinHandler = require('../controllers/_signinHandler');
const router = express.Router();

router.post('/', (req, res) => {
  signinHandler(req,res,user)
}).get("/",(req,res)=>{
    res.send("Get request to signin page")
});

module.exports = router;
