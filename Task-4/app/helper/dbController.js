const { MongoClient } = require("mongodb");
const connectDb = (cb) => {
  MongoClient.connect("mongodb://localhost:27017", async (err, client) => {
    if (err) return console.log(err);
    const db = client.db("Tasks");
    cb(db);
  });
};

module.exports = connectDb;
