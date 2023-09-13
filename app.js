const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const session = require("express-session");
const user = require("./modals/User");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(
  session({
    secret: "ankit",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
    },
  })
);

function requireLogin(req, res, next) {
  if (req.session.user) {
    next(); // User is logged in, continue to the next middleware/route
  } else {
    res.redirect("/signin/username"); // User is not logged in, redirect to login page
  }
}

function convertUsername(username) {
  const building = username.charAt(0).toUpperCase(); // Convert first character to uppercase
  const flatNumber = username.slice(1, 2); // Get characters 2 and 3
  const rest = username.slice(2); // Get the rest of the characters

  return `${building}-${flatNumber}/${rest}`;
}

app.set("views", path.join(__dirname, "./templates"));
app.use(express.static(path.join(__dirname, "./public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/SocietySync");
  console.log("connected to db");
}

const signinRouter = require("./routes/signin");
const handlePassRouter = require("./routes/handlePassword");
const signupRouter = require("./routes/signup");
const signinHandler = require("./controllers/_signinHandler");

app.use("/signin", signinRouter);
app.use("/handlePassword", handlePassRouter);
app.use("/signup", signupRouter);

app.get("/", requireLogin, (req, res) => {
  const user = req.session.user.userDetails; // Access user data from the session
  console.log("user == ");
  console.log(user);

  if (user.isAdmin) {
    // Render the dashboard view and send user data
    res.render("adminDashboard", {
      username: convertUsername(user.username),
      email: user.email,
      isLogedin: true,
    });
  } else {
    // Render the dashboard view and send user data
    res.render("userDashboard", {
      username: convertUsername(user.username),
      email: user.email,
      isLogedin: true,
    });
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    }
    res.redirect("/"); // Redirect to the login page after logout
  });
});

app.post("/userDashboard", requireLogin, (req, res) => {
  // console.log(req.body)
  // res.render("index", {username:req.body.username});
  signinHandler(req, res, user);
});

app.listen(port, () => {
  console.log(`Example app listening on http://127.0.0.1:${port}`);
});
