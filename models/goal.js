const mongooes = require('mongoose');

const goalSchema = mongoose.Schema({
	percentage: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	goalAmount: {
		type: Number,
	}
})

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;