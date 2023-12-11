const express = require("express");
const user = require("../modals/User");
const _allNotices = require("../controllers/_allNotices");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log("get to add notice");
  _allNotices(req, res);
});

module.exports = router;