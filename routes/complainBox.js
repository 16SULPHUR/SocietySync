const express = require("express");
const user = require("../modals/User");
const   { _newComplaintGET,_newComplaintPOST, _complaintManagerGet,_complaintImages, _complaintManagerPOST, _myComplaints} = require("../controllers/_complaintBox");
const router = express.Router();

const multer = require('multer');
// import {v2 as cloudinary} from 'cloudinary';


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/complaintImages", async (req, res) => {
  console.log("get to complaintImages");
  _complaintImages(req,res)
});

router.post("/newComplaint",upload.array('complaintImages', 3), async (req, res) => {
  console.log("post to newComplaint");
  _newComplaintPOST(req,res)
});

router.get("/", async (req, res) => {
  console.log("get complaint manager");
  _complaintManagerGet(req, res);
});

router.post("/", async (req, res) => {
  console.log("post complaint manager");
  _complaintManagerPOST(req, res);
});

router.post("/myComplaints", async (req, res) => {
  console.log("post myComplaints ");
  _myComplaints(req, res);
});
// router.post("/", async (req, res) => {
//   console.log("post toeventManager");
// //   _eventManagerPOST(req, res);
// });

module.exports = router;