const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Expense = require('../models/expense')
const Category = require('../models/category')

router.post('/:id', async (req, res, next) => {
	console.log("--Expense creation had been initiated---");
	try {
		const expenseDbEntry = {};
		expenseDbEntry.amount = req.body.amount;

		const foundCat = await Category.find({ name: req.body.category});
		expenseDbEntry.category = foundCat[0];

		expenseDbEntry.date = req.body.date;

		console.log(expenseDbEntry, "<<<<< expenseDbEntry after all 3 fields have been defined <<<<<");

		const createdExpense = await Expense.create(expenseDbEntry);
		console.log(createdExpense, "<<<< createdExpense");

		const foundUser = await User.findById({_id: req.params.id});

		foundUser.expenses.push(createdExpense);
		foundUser.save();
		res.json({
			status: 200,
			data: createdExpense,
		});
	} catch(err) {
		next(err);
		res.json({
			status: 404,
		})
	}
})











module.exports = router;