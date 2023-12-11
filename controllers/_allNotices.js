const Notices = require("../modals/Notice");

async function _allNotices(req, res) {
  if (!req.session.user) {
    res.redirect("/");
    return;
  }

  const notices = await Notices.find();
  console.log(notices);

  res.render(
    "F:/PROGRAMING/WEB DEVELOPMENT/SocietySync/templates/allNotices.ejs",{notices:notices}
  );
}

module.exports = _allNotices ;
