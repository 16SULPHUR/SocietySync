const uploadcareFile = require('@uploadcare/upload-client').uploadDirect;
const fs = require('fs').promises;

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

async function _newComplaintPOST(req, res) {
  if (!req.session.user) {
    res.redirect("/");
    return;
  } else if (!req.session.user.userDetails.isAdmin) {
    res.redirect("/");
    return;
  }

  if (req.body.id) {
    res.render(
      "F:/PROGRAMING/WEB DEVELOPMENT/SocietySync/templates/complaintBox.ejs"
    );
  } else {
    try {
      console.log("ffffffff");
      console.log(req.files);
    
      // Step 1: Upload to Uploadcare
      await req.files.forEach( async file => {
        const uploadedFile = await uploadcareFile(file.buffer, {
          publicKey: "6c35776300622c7fb7d6",
          fileName: file.originalname,
      });

      console.log(uploadedFile.cdnUrl)
      });

      // const uploadedImages = await Promise.all(req.files.map(async (file) => {
      //   // Upload each file to Uploadcare
      //   const uploadcareFile = await uploadcare.upload.file(file.buffer, {
      //     publicKey: "6c35776300622c7fb7d6",
      //     fileName: file.originalname, // Use the original filename
      //   });
    
      //   // Assuming you want the CDN URL of the uploaded file
      //   const fileUrl = uploadcareFile.cdnUrl;
    
      //   console.log("file::::");
      //   console.log(fileUrl);
    
      //   return fileUrl;
      // }));
    
      // Now, you can use the array 'uploadedImages' to store URLs in your database or do other processing.
      console.log('Images uploaded successfully:');
    
      // Here, you might want to store the URLs in your database or send a response back to the client.
      res.send('Images uploaded successfully.');
    } catch (error) {
      console.error('Error processing images:', error);
      res.status(500).send('Internal Server Error');
    }
    
  }
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
    "F:/PROGRAMING/WEB DEVELOPMENT/SocietySync/templates/eventManager.ejs",
    {
      events: await Event.find(),
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

  const body = req.body;
  if (body.deleteId) {
    console.log("delete event");
    const eventToDelete = await Event.deleteOne({ _id: body.deleteId });
  } else {
    eventToChange = await Event.findById(body.id);

    eventToChange.title = body.title;
    eventToChange.description = body.content;
    eventToChange.lastChangedBy = req.session.user.userDetails._id;

    await eventToChange.save();
  }

  req.session.user.allEvents = await Event.find();

  res.redirect("/eventManager");
}

module.exports = { _newComplaintGET, _newComplaintPOST };
