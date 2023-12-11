
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const session = require("express-session");
const User = require("./modals/User");
const Complaint = require("./modals/Complaint");
const Notice = require("./modals/Notice");
const Event = require("./modals/Event");
const maintenance = require("./modals/Maintenance");
const app = express();
const cors = require("cors");
// const PORT = process.env.PORT;
const PORT = process.env.PORT || 3000;

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

// app.use(
//   cors({
//     origin: ["https://127.0.0.1:3000", "https://societysync.onrender.com"]
//   })
// );

const DB = 'mongodb+srv://akpatil51340:%40Ankit2005@cluster0.rwylpqs.mongodb.net/SentosaEnclaveDataBase?retryWrites=true&w=majority'

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(DB
    // , {
    // useNewUrlParser : true,
    // userCreateIndex : true,
    // useUnifiedTopology : true,
    // useFindAndModify : false,
  // }
  );
  console.log("connected to db");
}




// require('dotenv').config();

// const connectDB = require('./connectMongo')

// connectDB()

app.set("view engine", "ejs");



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

// main().catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/SocietySync");
//   console.log("connected to db");
// }

const signinRouter = require("./routes/signin");
const handlePassRouter = require("./routes/handlePassword");
const signupRouter = require("./routes/signup");
const updateProfileRouter = require("./routes/updateProfile");
const maintenanceRouter = require("./routes/maintenance");
const maintenancePaymentRouter = require("./routes/maintenancePayment");
const addNoticeRouter = require("./routes/addNotice");
const manageNoticesRouter = require("./routes/manageNotices");
const eventManagerRouter = require("./routes/eventManager");
const complaintBoxRouter = require("./routes/complainBox");
const showEventsRouter = require("./routes/showEvents");
const rulesRouter = require("./routes/rules");
const gallaryRouter = require("./routes/gallary");
const allNoticesRouter = require("./routes/allNotices");
const signinHandler = require("./controllers/_signinHandler");

app.use("/signin", signinRouter);
app.use("/handlePassword", handlePassRouter);
app.use("/signup", signupRouter);
app.use("/profilephoto", signupRouter);
app.use("/updateProfile", updateProfileRouter);
app.use("/maintenance", maintenanceRouter);
app.use("/maintenancePayment", maintenancePaymentRouter);
app.use("/addNotice", addNoticeRouter);
app.use("/manageNotices", manageNoticesRouter);
app.use("/events", showEventsRouter);
app.use("/eventManager", eventManagerRouter);
app.use("/complaintBox", complaintBoxRouter);
app.use("/rules-and-regulations", rulesRouter);
app.use("/gallary", gallaryRouter);
app.use("/allNotices", allNoticesRouter);




app.get("/", requireLogin, async (req, res) => {
  const tempUser = req.session.user.userDetails; // Access user data from the session
  const user = await User.findById(tempUser._id); // Access user data from the session
  const allNotices = await Notice.find();
  const events = await Event.find();
  const maintenanceResult = await maintenance.find({ username: user.username }).exec();
    console.log("Maintenance result")
    console.log(maintenanceResult)
    console.log("all Notices:::::")
    console.log(allNotices)


  console.log(user)
  if (user.isAdmin) {
    const allComplaints = await Complaint.find();
    console.log("allComplaints:::::")
    console.log(allComplaints)
    // Render the dashboard view and send user data
    res.render("adminDashboard", {
      maintenanceDetails: maintenance,
      user:user,
      username:user.username,
      flat: convertUsername(user.username),
      email: user.email,
      name: user.name,
      phone: user.mobile,
      hasProfilePhoto:user.hasProfilePhoto,
      isLogedin: true,
      id:user._id,
      allNotices : allNotices,
      complaints : allComplaints,
      events : events,
      userIsAdmin : user.isAdmin,
    });
  } else {
    // Render the dashboard view and send user data
    res.render("userDashboard", {
      maintenanceDetails: maintenance,
      user:user,
      username:user.username,
      flat: convertUsername(user.username),
      email: user.email,
      name: user.name,
      phone: user.mobile,
      hasProfilePhoto:user.hasProfilePhoto,
      isLogedin: true,
      id:user._id,
      allNotices : allNotices,
      events : events,
      userIsAdmin : user.isAdmin,
    });
  }
});

app.get("/goHome", (req,res)=>{
  res.redirect("/");
})

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
  signinHandler(req, res, User, maintenance);
});

app.listen(PORT, () => {
  console.log(`Example app listening on ${PORT}`);
});
