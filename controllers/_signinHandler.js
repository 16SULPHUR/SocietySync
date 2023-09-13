const bcrypt = require("bcryptjs");

async function signinHandler(req, res, user) {
  const body = req.body;
  try {
    console.log(body);

    const result = await user.find({ username: body.username });
    console.log("result="+result[0])

    const passwordMatch = bcrypt.compareSync(body.password, result[0].password);
    if (passwordMatch) {
      // console.log("pass match")
      // req.session.user = {
      //   id: result[0]._id,
      //   username: result[0].username,
      //   // Add other relevant user data
      // };
      

      if (result[0].isAdmin) {
       console.log("Redirect to Admin Dashboard");
       res.redirect('/');
      } else {
        res.send("Redirect to user dashboard");
        res.redirect('/');
      }
    } else {
      res.send("Wrong Password Signin Again");
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = signinHandler;
