const mongoose = require("mongoose");
const  Schema  = mongoose.Schema;

const scooterSchema = new Schema({
	color: {
		type: String,
	},
	manufacturer: {
		type: String,
	},
	size: {
		type: String,
	},
	isAvailable: {
		type: String,
	},
});

const Scooter = mongoose.model('Scooter', scooterSchema);

module.exports = Scooter;
