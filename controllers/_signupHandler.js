const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");


async function signupHandler(req, res, user) {
  const body = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(body.password, 10);
    console.log("Body : ");
    console.log(req.body);

    const newUser = new user({
      username: body.username,
      email: body.email,
      password: hashedPassword,
      isAdmin: body.isAdmin,
      profilePhoto: fs.readFileSync(path.join('F:/PROGRAMING/WEB DEVELOPMENT/SocietySync/public/resources/user.jpg'))
    });

    await newUser.save().then(() => {
      console.log("Signup Success");
    });

    res.send("This is signup page");
  } catch (error) {
    res.status(500).send("Error occurred while signing up");
    console.log("Error is : " + error);
  }
}

module.exports = signupHandler;
