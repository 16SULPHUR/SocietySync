const express = require("express");
const user = require("../modals/User");
const  { _manageNoticesHandlerGET, _manageNoticesHandlerPOST} = require("../controllers/_manageNoticesHandler");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log("get to manage notice");
  _manageNoticesHandlerGET(req, res);
});

router.post("/", async (req, res) => {
  console.log("post to manage notice");
  _manageNoticesHandlerPOST(req, res);
});

module.exports = router;
