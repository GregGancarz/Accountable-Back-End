const mongooes = require('mongoose');

const goalSchema = mongoose.Schema({
	percent: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	benchmark: {
		type: Number,
	}
})

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;