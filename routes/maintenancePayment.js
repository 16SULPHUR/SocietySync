const express = require('express');
const User = require('../modals/User');
const maintenance = require('../modals/Maintenance');
const maintenancePaymentHandler = require('../controllers/maintenancePaymentHandler');
const router = express.Router();

router.post('/', (req, res) => {
    maintenancePaymentHandler(req,res,User,maintenance)
  }).get("/",(req,res)=>{
      res.redirect('/')
  });

  module.exports = router;