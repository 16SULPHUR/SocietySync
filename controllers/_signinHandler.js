const bcrypt = require("bcryptjs");

async function signinHandler(req, res, user) {
  const body = req.body;
  try {
    console.log(body);

    const result = await user.find({ username: body.username });

    const passwordMatch = bcrypt.compareSync(body.password, result[0].password);
    if (passwordMatch) {
      if (result[0].isAdmin) {
        res.send("Redirect to Admin Dashboard");
      } else {
        res.send("Redirect to user dashboard");
      }
    } else {
      res.send("Wrong Password Signin Again");
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = signinHandler;
