const express = require('express');
const router = express.Router();
const cors = require('cors');

// Load Reserved Model
const Reserved = require('../../models/Reserved');

const corsOptions = {
	origin: 'http://localhost:5000'
}

router.use(cors(corsOptions));

let errors = {}

// @route POST api/calendardates/addrequest
// @desc Requet Route
// @access Private 
router.post('/addrequest', (req, res) => {
	//dates array goes here
})	


// @route GET api/calendardates/current
// @desc Return current requests 
// @access Private
router.get('/current', (req, res) => {

Reserved.find({name: "Tim New"})
  .then( res => {
	  console.log(res)
  })
  .catch( err => res.send(err) )
})


//GET request, for dates that have already been reserved

//GET request, for dates that have been requested (Should they be reserved)

//POST request, to 

module.exports = router;
