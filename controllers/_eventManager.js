const Event = require("../modals/Event");

async function _addEventManagerGET(req, res) {
  if (!req.session.user) {
    res.redirect("/");
    return;
  } else if (!req.session.user.userDetails.isAdmin) {
    res.redirect("/");
    return;
  }

  res.render(
    "F:/PROGRAMING/WEB DEVELOPMENT/SocietySync/templates/addEvent.ejs"
  );
}

async function _addEventManagerPOST(req, res) {
  if (!req.session.user) {
    res.redirect("/");
    return;
  } else if (!req.session.user.userDetails.isAdmin) {
    res.redirect("/");
    return;
  }

  console.log(req.body)

  const newEvent = new Event({
    title : req.body.title,
    description : req.body.description,
    date : req.body.date,
    location : req.body.location,
    createdBy : req.session.user.userDetails._id
  })

  const savedEvent = await newEvent.save();

  updatedEvents = await Event.find();

  req.session.user.Events = updatedEvents;

  res.redirect("/")
}

async function _eventManagerGET(req, res) {
  // console.log("req.session.user:::")
  // console.log(req.session.user)

  if (!req.session.user) {
    res.redirect("/");
    return;
  } else if (!req.session.user.userDetails.isAdmin) {
    res.redirect("/");
    return;
  }

  res.render(
    "F:/PROGRAMING/WEB DEVELOPMENT/SocietySync/templates/eventManager.ejs",{
      events : await Event.find(),
    }
  );
}

async function _eventManagerPOST(req, res) {
  if (!req.session.user) {
    res.redirect("/");
    return;
  } else if (!req.session.user.userDetails.isAdmin) {
    res.redirect("/");
    return;
  }

  const body = req.body
  if(body.deleteId){
    console.log("delete event")
    const eventToDelete = await Event.deleteOne({_id : body.deleteId});
  }else { 
    eventToChange = await Event.findById(body.id);

    eventToChange.title = body.title;
    eventToChange.description = body.content;
    eventToChange.lastChangedBy = req.session.user.userDetails._id;

    await eventToChange.save();
  }

  req.session.user.allEvents = await Event.find();

  res.redirect("/eventManager");
}

module.exports = { _addEventManagerGET,_addEventManagerPOST, _eventManagerGET, _eventManagerPOST};
