const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
  },
  profilePhoto: {
    type: Buffer,
    default: Buffer.alloc(0), // Initialize with an empty buffer
  },
  
  isAdmin:{
    type:Boolean,
    default:false
  }
});

const user = mongoose.model("user", userSchema);
module.exports = user;