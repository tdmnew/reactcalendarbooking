// https://medium.com/@patrykcieszkowski/jwt-authentication-in-express-js-ee898b87a60

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const cors = require('cors');

// Authentication
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Load User Model
const User = require('../../models/User');

const corsOptions = {
	origin: 'http://localhost:5000'
}

router.use(cors(corsOptions));

let errors = {}

// @route GET api/users/test
// @desc Test Route
// @access Public
router.get('/test', (req, res) => res.json({ msg: "Users works"}));

// @route POST api/users/login
// @desc Login Route
// @access Public 
router.post('/login', (req, res) => {
	console.log("Request received")
  User.findOne({email: req.body.email})
  .then(user => {
    if(user) {
        if(req.body.password === '') {
            errors.password = "Please enter a password";
            res.status(400).json(errors)
        }
        bcrypt.compare(req.body.password, user.password)
        .then(match => { 
            if(match) {
                //Sign jwt token
                jwt.sign(
                    {id: user.id, name: user.name},
                    'secret',
                    { expiresIn: 3600 },
                    (err, token) => { 
                    res.json({
                        success: true,
                        token: "Bearer " + token
                        })
                    }
                )
            } else {
                errors.password = "Password incorrect";
                res.status(400).json(errors) 
            }
        })
        .catch(error => {console.log(error)})
    } else {
      errors.email = "User not found"
      res.status(400).json(errors);
    }
  })
 .catch(err => console.log(err));
})

module.exports = router;
