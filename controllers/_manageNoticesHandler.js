const Notices = require("../modals/Notice");

async function _manageNoticesHandlerGET(req, res) {
  // console.log("req.session.user:::")
  // console.log(req.session.user)

  if (!req.session.user) {
    res.redirect("/");
    return;
  } else if (!req.session.user.userDetails.isAdmin) {
    res.redirect("/");
    return;
  }

  allNotices = await Notices.find();
  res.render(
    "F:/PROGRAMING/WEB DEVELOPMENT/SocietySync/templates/manageNotices.ejs",
    {
      allNotices: allNotices,
    }
  );
}

async function _manageNoticesHandlerPOST(req, res) {
  const body = req.body;
  if (!req.session.user) {
    res.redirect("/");
    return;
  } else if (!req.session.user.userDetails.isAdmin) {
    res.redirect("/");
    return;
  }

  if (body.deleteId) {
    console.log(body.deleteId);
    const noticeToDelete = await Notices.deleteOne({_id : body.deleteId});
  } else {
    // console.log("req.body:::");
    // console.log(body);

    noticeToChange = await Notices.findById(body.id);

    noticeToChange.title = body.title;
    noticeToChange.content = body.content;
    noticeToChange.lastChangedBy = req.session.user.userDetails._id;

    await noticeToChange.save();
  }

  req.session.user.allNotices = await Notices.find();

  res.redirect("/manageNotices");
}

module.exports = { _manageNoticesHandlerGET, _manageNoticesHandlerPOST };
