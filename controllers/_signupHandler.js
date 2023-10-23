const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

async function signupHandler(req, res, user, maintenance) {
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
      profilePhoto: fs.readFileSync(
        path.join(
          "F:/PROGRAMING/WEB DEVELOPMENT/SocietySync/public/resources/user.jpg"
        )
      ),
    });

    savedUser = await newUser.save()
    // savedUser = await newUser.save().then(() => {
    //   console.log("Signup Success");
    // });

    console.log("savedUser::::")
    console.log(savedUser)

    const newMaintenance = new maintenance({
      username: body.username,
      monthlyDetails: {
        jan: {
          month:"jan 2023",
          status: "pending",
          due: "2023-01-10",
        },
        feb: {
          month:"feb 2023",
          status: "pending",
          due: "2023-02-10",
        },
        mar: {
          month:"mar 2023",
          status: "pending",
          due: "2023-03-10",
        },
        apr: {
          month:"apr 2023",
          status: "pending",
          due: "2023-04-10",
        },
        may: {
          month:"may 2023",
          status: "pending",
          due: "2023-05-10",
        },
        jun: {
          month:"jun 2023",
          status: "pending",
          due: "2023-06-10",
        },
        jul: {
          month:"jul 2023",
          status: "pending",
          due: "2023-07-10",
        },
        aug: {
          month:"aug 2023",
          status: "pending",
          due: "2023-08-10",
        },
        sep: {
          month:"sep 2023",
          status: "pending",
          due: "2023-09-10",
        },
        oct: {
          month:"oct 2023",
          status: "pending",
          due: "2023-10-10",
        },
        nov: {
          month:"nov 2023",
          status: "pending",
          due: "2023-11-10",
        },
        dec: {
          month:"dec 2023",
          status: "pending",
          due: "2023-12-10",
        },
      },
      amount: 500,
      fine: 100,
    });

    await newMaintenance.save().then(() => {
      console.log("Signup Success of maintenance");
    });

    res.send("This is signup page");
  } catch (error) {
    res.status(500).send("Error occurred while signing up");
    console.log("Error is : " + error);
  }
}

module.exports = signupHandler;
