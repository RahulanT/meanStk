require('dotenv').config();

const mongoose = require("mongoose");
// var MongoClient = require('mongodb').MongoClient;

const StartMongoServer =  () => {

  
     mongoose.connect(process.env.MONGO_URI , {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log("Successfully connect to MongoDB."))
    .catch(err => console.error("Connection error", err));
  
};

module.exports = StartMongoServer;
