const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const db = require("../models/model_index");
const StartMongoServer = require("../connections/connection");
const Auth = require("./auth")
// const User = require("../model/User");
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const userRouter = express.Router();

StartMongoServer();

userRouter.get( "/User"  , function(req , res) {

    res.send('User Authentication Route');

});

userRouter.post( "/UserLogin" , 

    [
      check("email", "Please enter a valid email").isEmail(),
      check("password", "Please enter a valid password").isLength({ min: 6})
    ] ,


  async function (req , res) {

    console.log(typeof( db.User) , typeof (db.mongoose));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body; //From LOGIN PAGE

    console.log('Input is Valid!!!' , email);

    try {

      let userEmail = await db.User.findOne({email: email}).exec();// FROM MONGODB LOGIN
      // let userPassword = await db.User.findOne({email: email , password:password}).exec();

      console.log('Hello ' , userEmail.password);

      const isMatch = await bcrypt.compare(password, userEmail.password);



      if(!userEmail) {
        
        return res.status(400).json({
          message: "User Not Exist"
        });

      }
      else if (isMatch) {

        console.log('im ere');
      

        const payload = {

            user: {
              id: userEmail.id
            }

          };

        jwt.sign(
          payload ,
          "randomString",
          {
            expiresIn: 300
          },
          (err, token) => {
            if (err) throw err;
            return res.status(200).json({
              token
            });
          }
        );


        }
      
        else {

          return  res.status(400).json({
            message: "Unknown Error"
          });

        }
     
    }

    catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
      }


});

userRouter.get("/me", Auth , async (req, res) => {

  try {

    // request.user is getting fetched from Middleware after token authentication
    let user = await db.User.findById( req.user.id );

    console.log('lets try:' , user , user.trades.length );

    let userTrades = {};

    for (let i = 0 ; i < user.trades.length ; i++ ) {
    
         userTrades[i] = await db.Trade.findById( user.trades[i] );

    }

    console.log( 'user trades ' , userTrades[0]);

    return res.json({trades: userTrades});
 
  }
  
  catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
  
});



userRouter.post( "/createTransacts" ,  
  

async function (req , res) {

  const {UserID , ticker , company} = req.body;

  let user = await db.User.find({email: UserID});

  console.log( user[0]._id.toString());

  return await db.Trade.create({ticker: ticker , company:company})
  
  .then( function (docTut) {
  
    console.log("\n>> Created Trade:\n", docTut);

     db.User.findByIdAndUpdate (

      { _id : user[0]._id.toString()},

      { $push: { trades:  new db.mongoose.mongo.ObjectId( docTut._id ) } },
      
      function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Updated User : ", docs);
            return  res.status(200).json({
              result: docs
            });
        }
      }

    );

  });
}
);



userRouter.post( "/transacts" ,  
  

async function (req , res) {

  const {UserID , ticker , company , noStocks , bsPrice , currPrice } = req.body;

  let user = await db.User.find({email: UserID});

  console.log( user[0]._id.toString());

  return await db.Trade.create({ticker: ticker , company:  company , noStocks: noStocks  , bsPrice: bsPrice, currPrice: currPrice })
  
  .then( function (docTut) {
  
    console.log( "\n>> Created Trade:\n" , docTut ) ;

     db.User.findByIdAndUpdate (

      { _id : user[0]._id.toString()},

      { $push: { trades:  new db.mongoose.mongo.ObjectId( docTut._id ) } },
      
      function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Updated User : ", docs);
            return  res.status(200).json({
              result: docs
            });
        }
      }

    );

  });
}
);



userRouter.post ( "/UserRegister" , [

  check("lastName", "Please enter a valid name").isLength({ min: 6}),
  check("firstName", "Please enter a valid name").isLength({ min: 6}),
  check("email", "Please enter a valid email").isEmail(),
  check("password", "Please enter a valid password").isLength({ min: 6})

],


async function (req , res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { lastName , firstName , email, password } = req.body;

    try {

      let userEmail = await db.User.findOne({email: email});

      if(userEmail){
        
        return res.status(400).json({
          message: "Email ID Already Exists"
        });

      }

      user = new db.User({
        userlastName: lastName,
        userfirstName: firstName,
        email: email,
        password: password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {

          user: {
              id: user.id
          }

      };

        jwt.sign (
          payload,
          "randomString", {
              expiresIn: 10000
          },
          (err, token) => {
              if (err) throw err;
              res.status(200).json({
                  token
              });
          }
      );


    }

      catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
      }



});



module.exports  = userRouter;