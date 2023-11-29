const express = require("express");
const user = require("../modals/User");
const   { _newComplaintGET,_newComplaintPOST} = require("../controllers/_complaintBox");
const router = express.Router();

const multer = require('multer');
// import {v2 as cloudinary} from 'cloudinary';


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// router.get("/newComplaint", async (req, res) => {
//   console.log("get to newComplaint");
// //   _newComplaintGET(req,res)
// });

router.post("/newComplaint",upload.array('complaintImages', 3), async (req, res) => {
  console.log("post to newComplaint");
  _newComplaintPOST(req,res)
});

// router.get("/", async (req, res) => {
//   console.log("get toeventManager");
// //   _eventManagerGET(req, res);
// });
// router.post("/", async (req, res) => {
//   console.log("post toeventManager");
// //   _eventManagerPOST(req, res);
// });

module.exports = router;