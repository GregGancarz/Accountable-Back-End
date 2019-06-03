const mongoose = require('mongoose');
const Category = require('./category')

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		required: true,
	},
	categories: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
	}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;