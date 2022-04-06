const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user"); //new addition
const profile = require("./routes/profile");
const InitiateMongoServer = require("./config/db");
const cors = require("cors");
const jwt = require('express-jwt');

// Initiate Mongo Server
InitiateMongoServer();

const app = express();
app.use(cors());
// PORT
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

// console.log(app.findOne());
// API Endpoints
app.use("/user", user);

//any calls defined below this line will require the java web token in their headers
app.use(jwt({secret: "randomString", algorithms: ['HS256']}))

// app.use("")
app.use('/profile', profile);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});