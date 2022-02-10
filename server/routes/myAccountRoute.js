const express = require("express");
const path = require("path");
const Auth =  require("./auth");


const myAccountRouter = express.Router();

myAccountRouter.get( "/"  , function(req , res) {

    res.status(200).json({

        message: "Welcome To Your Portfolio",

    });

});

myAccountRouter.get( "/dashboard" , Auth , function(req , res) {

    res.status(200).json({

        message: "Token Valid",
        

    });

});

module.exports  = myAccountRouter;