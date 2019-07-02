const express = require('express');
const router = express.Router();
const User = require('../models/user');

/// NEW Goal ///
router.post('/user/:id', async (req, res, next) => {
	console.log("--Goal creation had been initiated---");
	try {
		const goalDbEntry = {};
		goalDbEntry.name = req.body.name;
		goalDbEntry.percent = req.body.percent;
		goalDbEntry.benchmark = req.body.benchmark;

		console.log(goalDbEntry, "<<<<< goalDbEntry after all fields have been defined <<<<<");

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



module.exports = router;