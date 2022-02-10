require('dotenv').config();

const mongoose = require("mongoose");
// var MongoClient = require('mongodb').MongoClient;

// Replace this with your MONGOURI.
// const MONGOURI = "mongodb+srv://rahulanUser:rahulanpassword@cluster0.jl1my.mongodb.net/authDB?retryWrites=true&w=majority";

const StartMongoServer =  () => {

  
     mongoose.connect( process.env.MONGO_URI , {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log("Successfully connect to MongoDB."))
    .catch(err => console.error("Connection error", err));
  
};

module.exports = StartMongoServer;

// heroku config:set  MONGODB_URI = "mongodb+srv://rahulanUser:rahulanpassword@cluster0.jl1my.mongodb.net/authDB?retryWrites=true&w=majority";
