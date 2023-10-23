const Notices = require("../modals/Notice");
const User = require("../modals/User");

async function _addNoticeHandlerGET(
  req,
  res,
  User
) {
  if (!req.session.user) {
    res.redirect("/");
    return;
  } else if (!req.session.user.userDetails.isAdmin) {
    res.redirect("/");
    return;
  }

  // const userDetails = {... req.session.user.userDetails};

  res.render(
    "F:/PROGRAMING/WEB DEVELOPMENT/SocietySync/templates/addNotice.ejs"
  );
}

async function _addNoticeHandlerPOST(
  req,
  res,
  User
) {
  if (!req.session.user) {
    res.redirect("/");
    return;
  } else if (!req.session.user.userDetails.isAdmin) {
    res.redirect("/");
    return;
  }

  const body = req.body;

  const newNotice = new Notices({
    title: body.title,
    content: body.content,
    createdBy: req.session.user.userDetails._id,
  });

  await newNotice.save();

  const updatedNotices = await Notices.find();

  req.session.user.allNotices = updatedNotices;
  res.redirect("/");
}

module.exports = { _addNoticeHandlerGET, _addNoticeHandlerPOST };
