const bcrypt = require("bcryptjs");

const Notices = require('../modals/Notice');

async function passwordHandler(req,res,User) {
  const body = req.body;
  console.log("body-----" + body.username + body.password);
  const result = await User.find({ username: body.username });

  const allNotices = await Notices.find();

  const passwordMatch = bcrypt.compareSync(body.password, result[0].password);
  if (passwordMatch) {
    const { password, ...userDetails } = result[0]._doc;
    console.log("pass match");
    // start session
    req.session.user = {
      userDetails: userDetails,
      allNotices: allNotices  ,
    };

    if (result[0].isAdmin) {
      console.log("Redirect to Admin Dashboard");
      res.redirect("/");
    } else {
      // res.send("Redirect to user dashboard");
      res.redirect("/");
    }
  } else {
    res.send("Wrong Password Signin Again");
  }
}

module.exports = passwordHandler;