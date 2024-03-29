const app = require('./app.js');
const InitiateMongoServer = require("./config/db");


// Initiate Mongo Server
InitiateMongoServer();


// PORT
const PORT = process.env.PORT || 4000;

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
