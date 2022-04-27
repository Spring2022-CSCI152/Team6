//FILENAME : User.js

const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  major: {
    type: Number,
    required: true,
    default: 0 //undeclared
  },
  role:{
    type: String,
    require: true,
    default: "basic"
  },
  catalogYear: {
    type: Number,
  },
});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);