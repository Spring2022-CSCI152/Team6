//FILENAME : db.js

const mongoose = require("mongoose");

// Replace this with your MONGOURI.
const MONGOURI = "mongodb+srv://roadmap:csci152@csci152roadmap.aqfu4.mongodb.net/roadmap?retryWrites=true&w=majority";

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;