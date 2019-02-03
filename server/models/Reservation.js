const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReserverationSchema = new Schema({
		name: {
			type: String
		},
		email: {
			type: String
		},
		phone: {
			type: String
		},
		date: {
			type: String
		}
});

module.exports = Reserveration = mongoose.model('reservation', ReserverationSchema);

