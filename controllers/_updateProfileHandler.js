var fs = require('fs');
var path = require('path');


async function updateProfileHandler(req, res, User) {
    body = req.body;

    console.log("BODy:::::::")
    console.log(body)
  try {
    // Ensure you have a user ID associated with the uploaded photo

    // Find the user by ID
    const user = await User.findById({ _id: body.id });


    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if(body.name){
      user.name = body.name;
    }

    if(body.email){
      user.email=body.email;
    }

    if(req.file){
      user.hasProfilePhoto = true
    }
    
    if(body.phone){
      user.mobile = body.phone
    }
    
    const updatedUser =  await user.save();

    req.session.user.userDetails = updatedUser
    // req.session.user = {
    //   userDetails: updatedUser,
    //   // Add other relevant user data
    // };

    res.redirect("/");

    if(!(user.isAdmin)){
    // await res.render("F:/PROGRAMING/WEB DEVELOPMENT/SocietySync/templates/userDashboard.ejs", {
    //   username:user.username,
    //   flat: convertUsername(user.username),
    //   email: user.email,
    //   name: user.name,
    //   phone: user.mobile,
    //   hasProfilePhoto:user.hasProfilePhoto,
    //   isLogedin: true,
    //   id:user._id,
    // })
    // res.redirect("/goHome");
    
  }
    else{

    //  await res.render("F:/PROGRAMING/WEB DEVELOPMENT/SocietySync/templates/adminDashboard.ejs", {
    //     username:user.username,
    //     flat: convertUsername(user.username),
    //     email: user.email,
    //     name: user.name,
    //     phone: user.mobile,
    //     hasProfilePhoto:user.hasProfilePhoto,
    //     isLogedin: true,
    //     id:user._id,
    //   })

    //   res.redirect("/goHome");
    }
  } catch (error) {
    console.error("Error updating profile :", error);
    res.status(500).json({ message: 'error while updating profile' });
  }
}

function convertUsername(username) {
  const building = username.charAt(0).toUpperCase(); // Convert first character to uppercase
  const flatNumber = username.slice(1, 2); // Get characters 2 and 3
  const rest = username.slice(2); // Get the rest of the characters

  return `${building}-${flatNumber}/${rest}`;
}

module.exports = updateProfileHandler;
