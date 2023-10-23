const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name:{
    type:String
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
  },
  isAdmin:{
    type:Boolean,
    default:false
  },
  hasProfilePhoto:{
    type:Boolean,
    default:false
  },
  maintenance: { type: mongoose.Schema.Types.ObjectId, ref: 'Maintenance' }
});

const user = mongoose.model("user", userSchema);
module.exports = user;