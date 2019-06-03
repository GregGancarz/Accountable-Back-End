const mongoose 	= require('mongoose');
const Category 	= require('./category')
const Expense 	= require('./expense')

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
	}],
	expenses: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Expense',
	}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;