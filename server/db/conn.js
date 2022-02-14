const { MongoClient } = require("mongodb");
// const Db = process.env.ATLAS_URI;
const uri = "mongodb+srv://roadmap:csci152@csci152roadmap.aqfu4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
 
module.exports = {
  connectToServer: async function (callback) {
    await client.connect(async function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        var databasesList = await db.db("myFirstDatabase").admin().listDatabases();
        _db = db.db("myFirstDatabase");
        
        console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(err);
         });
         
  },
 
  getDb: function () {
    return _db;
  },
};