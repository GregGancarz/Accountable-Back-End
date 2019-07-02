const express = require('express');
const router = express.Router();
const User = require('../models/user');

/// NEW Goal ///
router.post('/user/:id', async (req, res, next) => {
	console.log("--Goal creation had been initiated---");
	try {
		const goalDbEntry = {};
		goalDbEntry.amount = req.body.amount;

		const foundCat = await Category.find({name: req.body.category.name});
		goalDbEntry.category = foundCat[0];

		goalDbEntry.date = req.body.date;

		console.log(goalDbEntry, "<<<<< goalDbEntry after all 3 fields have been defined <<<<<");

		const createdGoal = await goal.create(goalDbEntry);
		console.log(createdGoal, "<<<< createdGoal");

		const foundUser = await User.findById({_id: req.params.id});

		foundUser.goals.push(createdGoal);
		await foundUser.save();
		res.json({
			status: 200,
			data: createdGoal,
		});
	} catch(err) {
		next(err);
	}
})