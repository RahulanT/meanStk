const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const WatchList = require("../WatchList");

// const User = require("../model/User");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const watchListRouter = express.Router();


watchListRouter.get("/MyWatchList", function(req , res) {

    res.send('User Authentication Route');

});

watchListRouter.post("/AddToWatchList" , 

 [

    check("company", "Please enter a valid name").isLength({ min: 3}),
    check("ticker", "Please enter a valid name").isLength({ min: 6}),
    check("sector", "Please enter a valid sector").isLength({ min: 6 }),
    check("watchPrice", "Please enter a valid sector").isInteger(),
    check("currPrice", "Please enter a valid sector").isInteger(),

  ] ,

function (req , res) {
    
    try {
  
        WatchList.insertOne(
  
          {userlastName: lastName , userfirstName : firstName , email: email, password: password},
         
          function(err, res) {
            
            console.log(res);
           
        });
  
        }
  
        catch (e) {
          console.error(e);
          res.status(500).json({
            message: "Server Error"
          });
        }



})

watchListRouter.delete("/RemoveFromWatchList" , function (req , res) {

})