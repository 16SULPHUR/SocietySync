const express = require('express');
const User = require('../modals/User');
const maintenance = require('../modals/Maintenance');
const maintenanceHandler = require('../controllers/maintenanceHandler');
const router = express.Router();

router.post('/', (req, res) => {
    maintenanceHandler(req,res,User,maintenance)
  }).get("/",(req,res)=>{
      res.redirect('/')
  });

  module.exports = router;