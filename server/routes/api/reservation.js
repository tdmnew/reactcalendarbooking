const express = require('express');
const router = express.Router();
const cors = require('cors');

// Load Reservation Model
const Reservation = require('../../models/Reservation');

const corsOptions = {
	origin: 'http://localhost:5000'
}

router.use(cors(corsOptions));

let errors = {}

// @route POST api/reservation/addreservation
// @desc Requet Route
// @access Private 
router.post('/adddate', (req, res) => {
	var reservationFields = {}
	if (req.body.requests) reservationFields.requests = req.body.requests
	if (req.body.dates) reservationFields.dates = req.body.dates
	Reservation.findOne({date: { $in: reservationFields.dates } })
	.then( reservedDate => {
		if(reservedDate) {
			return res.status(400).json({error: "Date already exists"})
		} else {
			for(let i = 0; i < reservationFields.dates.length; i++) {
				let newDate;
				if(reservationFields.requests) {
					newDate = new Reservation(reservationFields.requests[i]).save()
				} else {
					let dateObj = {date: reservationFields.dates[i]}
					newDate = new Reservation(dateObj).save()
				}
			}
			res.send(reservationFields.dates)
		}
	})
	.catch( err => res.send(err) )
})	

// @route DELETE api/reserveration/deletereservation
// @desc Delete reservation dates
// @access private
router.delete('/deletereservations', (req, res) => {
	var dates = req.body.dates
	Reservation.deleteMany({date: {$in: dates}})
	.then(res => {
		if(res) {
			res.send("Deletion successful")
		} else {
			return res.status(400).json({error: "Dates do not exist in reserved DB"})
		}

	})
	.catch(err => res.send(err) )
})

// @route GET api/reservation/current
// @desc Return reservation dates 
// @access Private
router.get('/current', (req, res) => {

Reservation.find()
  .then( requests => {
	 res.send(requests) 
  })
  .catch( err => res.send(err) )
})

module.exports = router;
