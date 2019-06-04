const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Expense = require('../models/expense')
const Category = require('../models/category')



router.post('/user/:id', async (req, res, next) => {
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
		await foundUser.save();
		res.json({
			status: 200,
			data: createdExpense,
		});
	} catch(err) {
		next(err);
	}
})





router.get('/user/:id', async (req, res, next) => {
	console.log("--Expense list retrieval has been initiated--");
	try {
		foundUser = await User.findById({_id: req.params.id});
		res.json({
			status:200,
			data: foundUser.expenses,
		});
	} catch(err) {
		next(err);
	}
});




router.get('/expense/:id', async (req, res, next) => {
	console.log("--Lone expense retrieval has been initiated--");
	try {
		foundExpense = await Expense.findById({_id: req.params.id});
		res.json({
			status: 200,
			data: foundExpense,
		});
	} catch {
		next(err);
	}
})




router.put('/expense/:id', async (req, res, next) => {
	console.log("--Expense update has been initiated--");
	try {
		const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, {new: true});
		console.log(req.body, "<<== req.body");
		res.json({
			status: 200,
			data: updatedExpense,
		});
	} catch(err) {
		next(err);
	}
})




router.delete('/user/:userid/expense/:expenseid', async (req, res, next) => {
	console.log("--Expense deletion has been initiated--");
	try {
		const foundUser = await User.findById({_id: req.params.userid});
		const deletedExpense = await Expense.findByIdAndDelete(req.params.expenseid);

		function isNotDeleted(expense) {
			console.log(expense, "<<< expense ");
			console.log(" ");
			console.log(deletedExpense, "<<< deletedExpense");
		  	return expense != deletedExpense;
		}
		const filteredExpenseList = foundUser.expenses.filter(isNotDeleted);


		res.json({
			status: 200,
			data: deletedExpense, filteredExpenseList
		})
	} catch(err) {
		next(err);
	}
})



module.exports = router;