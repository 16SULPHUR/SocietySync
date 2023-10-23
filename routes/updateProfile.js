const express = require('express');
const user = require('../modals/User');
const updateProfileHandler = require('../controllers/_updateProfileHandler');
const router = express.Router();
const multer = require('multer');
const path = require('path');
// const sharp = require('sharp');



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'F:/PROGRAMING/WEB DEVELOPMENT/SocietySync/public/uploads'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const username = req.body.oldUsername;


    console.log("file orig name");
    console.log(file.originalname);
    cb(null, `${username}_profile.jpg`); // Use the original filename
  },
});

const upload = multer({ storage });


router.post('/',upload.single('profilePhoto'), (req, res) => {
  updateProfileHandler(req,res,user);
}).get("/",(req,res)=>{
    res.send("Get request to profile update page")
});

module.exports = router;