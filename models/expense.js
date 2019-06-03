const mongoose = require('mongoose');
const Category = require('./category')

const expenseSchema = new mongoose.Schema({
	amount: {
		type: Number,
		required: true,
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
})

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;