const express = require("express");
const user = require("../modals/User");
const   { _addEventManagerGET,_addEventManagerPOST, _eventManagerGET, _eventManagerPOST} = require("../controllers/_eventManager");
const router = express.Router();

router.get("/addEvent", async (req, res) => {
  console.log("get to addEvent");
  _addEventManagerGET(req, res);
});

router.post("/addEvent", async (req, res) => {
  console.log("post to addEvent");
  _addEventManagerPOST(req, res);
});

router.get("/", async (req, res) => {
  console.log("get toeventManager");
  _eventManagerGET(req, res);
});
router.post("/", async (req, res) => {
  console.log("post toeventManager");
  _eventManagerPOST(req, res);
});

module.exports = router;