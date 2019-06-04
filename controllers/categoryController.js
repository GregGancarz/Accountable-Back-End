const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Category = require('../models/category');

// email: fakestEmailEver@dne.com
// password: password1
// _id: 5cf56a9fda6f2733f4e15b2b

////////////// CATEGORY CONTROLLER COMPLETE FOR BASIC CRUD ////////////////

router.post('/:id', async (req, res, next) => {
	console.log("--Category creation has been initiated---");
	try {
		const foundUser = await User.findById({_id: req.params.id});
		const catName = req.body
		const createdCat = await Category.create(req.body);
		foundUser.categories.push(createdCat);
		foundUser.save();
		res.json({
			status: 200,
			data: createdCat,
		});
	} catch(err) {
		next(err);
	};
});

router.get('/:id', async (req, res, next) => {
	console.log("--Category retrieval has been initiated--");
	try {
		foundUser = await User.findById({_id: req.params.id});
		res.json({
			status:200,
			data: foundUser.categories,
		});
	} catch(err) {
		next(err);
	}
});

router.put('/:id', async (req, res, next) => {
	console.log("--Category update has been initiated--");
	try {
		const updatedCat = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true});
		res.json({
			status: 200,
			data: updatedCat,
		});
	} catch(err) {
		next(err);
		res.json({
			status: 404,
			data: err
		});
	}
});

module.exports = router;