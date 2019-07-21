const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Expense = require('../models/expense')
const Category = require('../models/category')


/// NEW expense ///
router.post('/user/:id', async (req, res, next) => {
	console.log("--Expense creation had been initiated---");
	try {
		const expenseDbEntry = {};
		expenseDbEntry.amount = req.body.amount;

		const foundCat = await Category.find({name: req.body.category.name});
		expenseDbEntry.category = foundCat[0];

		expenseDbEntry.date = req.body.date;

		const createdExpense = await Expense.create(expenseDbEntry);
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




// GET USER's expense LIST
router.get('/user/:id', async (req, res, next) => {
	console.log("--Expense list retrieval has been initiated--");
	try {
		foundUser = await User.findById({_id: req.params.id})
			.populate({
				path: 'expenses',
				populate: {
					path: 'category'
				}
			})



		res.json({
			status:200,
			data: foundUser.expenses,
		});
	} catch(err) {
		next(err);
	}
});


// GET USER's expenses by category query
router.get('/user/:id/:query', async (req, res, next) => {
	console.log("--Expense list retrieval has been initiated--");
	try {
		foundUser = await User.findById({_id: req.params.id})
			.populate({
				path: 'expenses',
				populate: {
					path: 'category'
				}
			})

		res.json({
			status:200,
			data: foundUser.expenses,
		});
	} catch(err) {
		next(err);
	}
});


// find lone expense. For Postman and diagnosis. Not currently available to users.
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



/// update
router.put('/expense/:id', async (req, res, next) => {
	console.log("--Expense update has been initiated--");
	try {
		const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, {new: true});
		res.json({
			status: 200,
			data: updatedExpense,
		});
	} catch(err) {
		next(err);
	}
})




router.delete('/expense/:id', async (req, res, next) => {
	console.log("--Expense deletion has been initiated--");
	try {
		const deletedExpense = await Expense.findByIdAndRemove({_id: req.params.id});
		res.json({
			status: 200,
			data: deletedExpense
		})
	} catch(err) {
		next(err);
	}
})



module.exports = router;