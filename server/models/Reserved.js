const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservedSchema = new Schema({
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

module.exports = Reserved = mongoose.model('reserved', ReservedSchema);

