//api code for backend server

const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user"); //new addition
const course = require("./routes/course"); //new addition
const profile = require("./routes/profile");
const cors = require("cors");
const jwt = require('express-jwt');



const app = express();
app.use(cors());


// Middlewares
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

// API Endpoints
app.use("/user", user);
app.use("/course", course);

//any calls defined below this line will require the json web token in their headers
app.use(jwt({secret: "randomString", algorithms: ['HS256']}))

app.use('/profile', profile);

module.exports = app;