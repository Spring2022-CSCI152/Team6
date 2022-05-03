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
    type: String,
    required: true,
    default: "undeclared"
  },
  year: {
    type: Number,
    default: "0"
  },
  expectedGraduationDate: {
    type: Number,
    default: "0"
  },
  role:{
    type: String,
    default: "basic"
  }
  
});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);