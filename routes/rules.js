const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log("get to rules");

  if (!req.session.user ) {
    res.redirect("/");
    return;
  }
  
  res.render("F:/PROGRAMING/WEB DEVELOPMENT/SocietySync/templates/rules.ejs")
});

module.exports = router;