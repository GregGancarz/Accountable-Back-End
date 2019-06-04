const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Expense = require('../models/expense')
const category = require('../models/category')

router.post('/:id', async (req, res, next) => {
	console.log("--Expense creation had been initiated---");
	try {
		const expenseDbEntry = {};
		const expenseDbEntry.amount = req.body.amount;
		console.log(req.body.amount, "<<< req.body.amount <<<");

		const foundCat = await Category.find({ name: req.body.category});
		console.log(foundCat, "<<< foundCat <<<");

		const expenseDbEntry.category = foundCat;
		const expenseDbEntry.date = req.body.date;
		console.log(req.body.date, "<<< DATE <<<<");

		const createdExpense = await Expense.create(expenseDbEntry);
		console.log(createdExpense, "<<<< createdExpense");

		const foundUser = await User.findById({_id: req.params.id});
		console.log(foundUser, "<=== the foundUser");

		foundUser.expenses.push(createdExpense);
		foundUser.save();
		res.json({
			status: 200,
			data: createdExpense,
		});
	} catch {
		next(err);
		res.json({
			status: 404,
			data: err,
		})
	}
})











module.exports = router;