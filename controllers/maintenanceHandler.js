

async function maintenanceHandler(req, res, User, Maintenance) {
  const body = req.body;
  try {
   console.log("HELLO", body.id)
   const user = await User.findById({ _id: body.id });

   console.log(user)

   const maintenanceResult = await Maintenance.find({ username: user.username }).exec();
    console.log("Maintenance result:::::::")
    console.log(maintenanceResult[0])

   res.render("F:/PROGRAMING/WEB DEVELOPMENT/SocietySync/templates/maintenance.ejs", {
    maintenanceDetails : maintenanceResult[0],
  })
  } catch (error) {
    console.log(error);
  }
}

module.exports = maintenanceHandler;
