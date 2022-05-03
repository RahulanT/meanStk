const express = require("express");
const path = require("path");
const Auth =  require("./auth");


const aboutMeRouter = express.Router();

aboutMeRouter.get( "/" , Auth , function(req , res) {

    res.status(200).sendFile(path.join(__dirname , 'public/htmlPages/public/profilePage/grid_practice.html'));

});

module.exports  = myAccountRouter;