const uploadcareFile = require("@uploadcare/upload-client").uploadDirect;
const Complaint = require("../modals/Complaint");
const User = require("../modals/User");

async function _newComplaintGET(req, res) {
  if (!req.session.user) {
    res.redirect("/");
    return;
  } else if (!req.session.user.userDetails.isAdmin) {
    res.redirect("/");
    return;
  }

  res.render(
    "F:/PROGRAMING/WEB DEVELOPMENT/SocietySync/templates/complaintBox.ejs"
  );
}

async function _complaintManagerGet(req, res) {
  if (!req.session.user) {
    res.redirect("/");
    return;
  } else if (!req.session.user.userDetails.isAdmin) {
    res.redirect("/");
    return;
  }

  const allComplaints = await Complaint.find();

  res.render(
    "F:/PROGRAMING/WEB DEVELOPMENT/SocietySync/templates/complaintManager.ejs",
    { complaints: allComplaints }
  );
}

async function _newComplaintPOST(req, res) {
  if (!req.session.user) {
    res.redirect("/");
    return;
  }

  if (req.body.id) {
    res.render(
      "F:/PROGRAMING/WEB DEVELOPMENT/SocietySync/templates/complaintBox.ejs",
      { userId: req.body.id }
    );
  } else {
    try {
      console.log(req.body);
      const uploadPromises = req.files.map((file) => uploadImages(file));
      const urls = await Promise.all(uploadPromises);

      console.log("final:::");
      console.log(urls);

      console.log("Images uploaded successfully:");
      const u = await User.find({ _id: req.body.userId });
      console.log(u);
      const user = { flat: u[0].username, name: u[0].name };

      const newComplaint = new Complaint({
        complaintTitle: req.body.complaintTitle,
        complaintDetails: req.body.complaintDetails,
        images: urls,
        submittedBy: user,
      });

      const submittedComplaint = await newComplaint.save();

      console.log(submittedComplaint);

      res.redirect("/");
    } catch (error) {
      console.error("Error processing images:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

async function uploadImages(file) {
  try {
    const uploadedFile = await uploadcareFile(file.buffer, {
      publicKey: "6c35776300622c7fb7d6",
      fileName: file.originalname,
    });
    console.log(uploadedFile);
    return uploadedFile.cdnUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Re-throw the error to be caught in the main function
  }
}

async function _complaintManagerPOST(req, res) {
  if (!req.session.user) {
    res.redirect("/");
    return;
  } else if (!req.session.user.userDetails.isAdmin) {
    res.redirect("/");
    return;
  }

  console.log(req.body);
  const complaint = await Complaint.findById({ _id: req.body.saveId });
  complaint.status = "resolved";
  const saved = await complaint.save();

  console.log(saved);

  const allComplaints = await Complaint.find();

  res.render(
    "F:/PROGRAMING/WEB DEVELOPMENT/SocietySync/templates/complaintManager.ejs",
    { complaints: allComplaints }
  );
}

async function _complaintImages(req, res) {
  if (!req.session.user) {
    res.redirect("/");
    return;
  } 

  const complaint = await Complaint.find({ _id: req.query.c });
  console.log(complaint[0].images);
  const images = complaint[0].images;
  res.render(
    "F:/PROGRAMING/WEB DEVELOPMENT/SocietySync/templates/complaintImages.ejs",
    { images: images }
  );
}

async function _myComplaints(req, res) {
  if (!req.session.user) {
    res.redirect("/");
    return;
  }

  const u = await User.find({ _id: req.body.id });
  console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
  console.log(req.body)
  const user = { flat: u[0].username, name: u[0].name };

  const myComplaints = await Complaint.find({submittedBy:user})
  console.log("myComplaints:::::::::::::")
  console.log(myComplaints)
  res.render(
    "F:/PROGRAMING/WEB DEVELOPMENT/SocietySync/templates/myComplaints.ejs",
    { myComplaints: myComplaints }
  );
}

module.exports = {
  _newComplaintGET,
  _newComplaintPOST,
  _complaintManagerGet,
  _complaintImages,
  _complaintManagerPOST,
  _myComplaints
};
