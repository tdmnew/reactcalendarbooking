const express = require('express');
const router = express.Router();
const cors = require('cors');

// Load Request Model
const Request = require('../../models/Request');
const Reservation = require('../../models/Reservation');

const corsOptions = {
	origin: 'http://localhost:5000'
}

router.use(cors(corsOptions));

let errors = {}

// @route POST api/request/addrequest
// @desc Requet Route
// @access Private 
router.post('/addrequest', (req, res) => {
	//dates array goes here
	
	var dateFields = {}
	
	dateFields.dates = req.body.dates
	
	if (req.body.name) dateFields.name = req.body.name
	if (req.body.email) dateFields.email = req.body.email
	if (req.body.phone) dateFields.phone = req.body.phone
	
	console.log(dateFields.dates)

	Reservation.findOne({dates: { $in:dateFields.dates} })
	.then(date => { 
		if(date) { 
			return res.status(400).json({error: "Date already exists"}) 
		} else {
			const newDate = new Request(dateFields)
			newDate.save()
			res.send(newDate)	
		}
	})
	.catch(err => res.send(err))
});


// @route delete api/request/deleterequest
// @desc Request Route
// @access Private 
router.delete('/deleterequest', (req, res) => {
	Request.deleteOne({name: req.body.name})
	.then( res => {
		if(res) {
			res.send("Request deletion successfull")
		} else {
			return res.status(400).json({error: "Deletion has failed"})
		}
	})
	.catch( err => {
		res.send(err)
	})

})


// @route GET api/request/current
// @desc Return current requests 
// @access Private
router.get('/current', (req, res) => {

Request.find()
  .then( requests => {
	 res.send(requests) 
  })
  .catch( err => res.send(err) )
})

module.exports = router;
