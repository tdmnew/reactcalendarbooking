const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
		name: {
			type: String
		},
		email: {
			type: String
		},
		phone: {
			type: String
		},
		dates: []
});

module.exports = Request = mongoose.model('requests', RequestSchema);

