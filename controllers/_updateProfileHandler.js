var fs = require('fs');
var path = require('path');


async function updateProfileHandler(req, res, User) {
    body = req.body;
    // console.log(req);
  try {
    // Ensure you have a user ID associated with the uploaded photo

    // Find the user by ID
    const user = await User.findById({ _id: body.id });


    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Store the file in MongoDB
    // user.profilePhoto = fs.readFileSync(path.join('F:/PROGRAMING/WEB DEVELOPMENT/SocietySync/uploads/' + req.file.filename))

    // // Save the user with the updated profile photo
    // await user.save().then(() => {
    //   console.log("user save()");
    // });

    res.redirect("/");
  } catch (error) {
    console.error("Error updating profile :", error);
    res.status(500).json({ message: 'error while updating profile' });
  }
}

module.exports = updateProfileHandler;
