const express = require("express");
const user = require("../modals/User");
const {
  _addNoticeHandlerGET,
  _addNoticeHandlerPOST,
} = require("../controllers/_addNoticeHandler");
const router = express.Router();

router.get("/", async (req, res, user) => {
  console.log("get to add notice");
  _addNoticeHandlerGET(req, res, user);
});

router.post("/", async (req, res, user) => {
  console.log("post to add notice");
  _addNoticeHandlerPOST(req, res, user);
});

module.exports = router;
