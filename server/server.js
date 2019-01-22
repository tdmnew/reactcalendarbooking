const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const login = require('./credentials');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Load Routes
const request = require('./routes/api/request');
const reserved = require('./routes/api/reserved');

// Use Routes - Needs leading '/' or won't work!
app.use('/api/request', request);
app.use('/api/reserved', reserved);


//Load DB

var db = `mongodb://${login.user}:${login.password}@ds145223.mlab.com:45223/chalettoitrouge`;

// Mongoose server
mongoose.connect(db)
.then( () => console.log("MongoDB connected") )
.catch(err => console.log(err))


//Set Port Number
process.env.PORT = 8080;

// Express server
app.listen(process.env.PORT, () => console.log("Server is now running"))
