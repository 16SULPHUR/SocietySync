const express = require("express");
const {_gallaryController} = require("../controllers/_gallaryController");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log("get to rules");

  if (!req.session.user ) {
    res.redirect("/");
    return;
  }
  
  _gallaryController(req,res)
});

module.exports = router;