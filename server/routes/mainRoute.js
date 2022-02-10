const express = require("express");
const uri = "mongodb+srv://rahulanUser:rahulanpassword@cluster0.jl1my.mongodb.net/testCreateDatabase?retryWrites=true&w=majority";

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const mainRouter = express.Router();

const dbConn = require("../connections/connection");

dbConn.connectToServer( function(err) {

    if (err) throw err;

    console.log('callback returned');
});




mainRouter.route("/database").get(async function (req, res) {

    let dbConnect = dbConn.getDb();
  
    dbConnect
      .collection("testCreateCollection")
      .find({})
      .toArray( function (err, result) {
        if (err) {
          res.status(400).send("Error fetching listings!");
       } else {
          res.json(result);
        }
      });

  });

mainRouter.route("/database/newdocument").post( function (req, res) {

    let dbConnect = dbConn.getDb();

    console.log(req.body);

    let documentLayout = {
      post_name: req.body.name,
      last_modified: new Date(),
      post_age : req.body.age,
      post_id: req.body.id,
    };
  
    dbConnect
      .collection("testCreateCollection")
      .insertOne(documentLayout, function (err, result) {
        if (err) {
          res.status(400).send("Error inserting matches!");
        } else {
          console.log(`Added a new match with id ${result.insertedId}`);
          res.status(204).send();
        }
      });

  });

mainRouter.route("/database/updateDocument").post(function (req, res) {
    const dbConnect = dbConn.getDb();
    const listingQuery = { _id: req.body.id };
    const updates = {
      $inc: {
        likes: 1
      }
    };
  
    dbConnect
      .collection("testCreateCollection")
      .updateOne(listingQuery, updates, function (err, _result) {
        if (err) {
          res.status(400).send(`Error updating likes on listing with id ${listingQuery.id}!`);
        } else {
          console.log("1 document updated");
        }
      });
  });

  module.exports = mainRouter;
