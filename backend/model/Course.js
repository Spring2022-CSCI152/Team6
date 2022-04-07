//FILENAME : User.js

const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({
  classNameAb: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    required: true,
  },
  Prerequisites: {
    type: Array,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Units: {
    type: Number,
    required: true,
  },
  TermTypicallyOffered: {
    type: Array,
    required: true,
  },
});

// export model user with UserSchema
module.exports = mongoose.model("course", CourseSchema);
