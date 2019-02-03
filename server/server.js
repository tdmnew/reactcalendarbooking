const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bsCredentials = require('./bsCredentials');
const passport = require('passport');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Load Routes
const request = require('./routes/api/request');
const reservation = require('./routes/api/reservation');
const user = require('./routes/api/user');

// Use Routes - Needs leading '/' or won't work!
app.use('/api/request', request);
app.use('/api/reservation', reservation);
app.use('/api/users', user);


//Load DB
//Goto MongoDB, register a database, and provide your details in the credentials document, listing the details below:
var db = bsCredentials.database

// Mongoose server
mongoose.connect(db)
.then( () => console.log("MongoDB connected") )
.catch(err => console.log(err))


//Set Port Number
process.env.PORT = 8080;

//JWT Passport Strat Config
app.use(passport.initialize());
require('./auth/passport')(passport);

// Express server
app.listen(process.env.PORT, () => console.log("Server is now running"))
