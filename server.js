// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const  userRouter  = require('./server/routes/userRoute');
const  myAccountRouter  = require('./server/routes/myAccountRoute');
const  aboutMeRouter  = require('./server/routes/aboutMeRoute');

const db = require("./server/models/model_index");

const app = express();

app.use(bodyParser.json());


console.log(path.join( __dirname , 'public/htmlPages/stk2WBPG.html'));

app.get('/', function(req, res) {

    res.sendFile(path.join(__dirname , 'public/htmlPages/stk2WBPG.html')); // load our public/index.html file

});


// app.get('/PlotView' , function(req, res) {

//     res.sendFile(path.join(__dirname , 'public/htmlPages/fetchingtest_2.0.html')); // load our public/index.html file

// });

app.use( '/Login-Auth' , userRouter );

app.use( '/My-Account' , myAccountRouter );

app.use( '/AboutMe' , aboutMeRouter );


app.use(express.static(path.join(__dirname, 'public')));


app.listen(process.env.PORT || 5000);




console.log(`Server is running on port: ${process.env.PORT}`);



















// Role.estimatedDocumentCount ( (err, count) => {

//     if (!err && count === 0) {

//       new Role({
//         name: "user"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'user' to roles collection");
//       });

//       new Role({
//         name: "moderator"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'moderator' to roles collection");
//       });

//       new Role({
//         name: "admin"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'admin' to roles collection");
//       });
//     }

// });