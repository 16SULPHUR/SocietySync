async function _usernameHandler(req, res, User){

    const body = req.body;
    
    let user = convertUsername(body.username);

    const result = await User.find({username:body.username});
    console.log("result===="+result[0]);

    res.render("password", {user:user, rawUser:body.username});
}

function convertUsername(username) {
    const building = username.charAt(0).toUpperCase(); // Convert first character to uppercase
    const flatNumber = username.slice(1, 2); // Get characters 2 and 3
    const rest = username.slice(2); // Get the rest of the characters
  
    return `${building}-${flatNumber}/${rest}`;
  }

module.exports = _usernameHandler;