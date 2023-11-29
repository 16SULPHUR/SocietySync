const express = require("express");
const User = require("../modals/User");
const Events = require("../modals/Event");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log("get to show events");

  if (!req.session.user) {
    res.redirect("/");
    return;
  }

 res.render("F:/PROGRAMING/WEB DEVELOPMENT/SocietySync/templates/showEvents.ejs",{
    user : req.session.user.userDetails,
    events : await Events.find(),
 })
});

module.exports = router;