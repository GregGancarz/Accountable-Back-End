const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Category = require('../models/category');



////////////// CATEGORY CONTROLLER COMPLETE FOR BASIC CRUD ////////////////

// CREATE new cat
router.post('/user/:id', async (req, res, next) => {
	console.log("--Category creation has been initiated---");
	try {
		const foundUser = await User.findById({_id: req.params.id});
		const catName = req.body
		const createdCat = await Category.create(req.body);
		for(let i = 0; i < createdCat.length; i++ ) {
			foundUser.categories.push(createdCat[i])
		};
		await foundUser.save();
		res.json({
			status: 200,
			data: createdCat,
		});
	} catch(err) {
		next(err);
	};
});




// GET user's cat LIST
router.get('/user/:id', async (req, res, next) => {
	console.log("--User's category retrieval has been initiated--");
	try {
		foundUser = await User.findById({_id: req.params.id}).populate('categories').populate('expenses');
		res.json({
			status:200,
			data: foundUser.categories,
		});
	} catch(err) {
		next(err);
	}
});




// GET LONE cat based off id
router.get('/cat/:id', async (req, res, next) => {
	console.log("--Lone category retrieval has been initiated--");
	try {
		foundCat = await Category.findById({_id: req.params.id});
		res.json({
			status: 200,
			data: foundCat,
		});
	} catch {
		next(err);
	}
})

// UPDATE cat
router.put('/cat/:id', async (req, res, next) => {
	console.log("--Category update has been initiated--");
	try {
		const updatedCat = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true});
		console.log(req.boy, "<-- req.body");
		res.json({
			status: 200,
			data: updatedCat,
		});
	} catch(err) {
		next(err);
	}
});

// DELETE CATEGORY //
// router.delete('/cat/:id', async (req, res, next) => {
// 	console.log("--Category deletion has been initiated--");
// 	try {

// 		// deletion of category. Update posted expenses with replaced category before hand as well
// 		// will have to do so in a separate route
// 		const deletedCat = await Category.findById({_id: req.params.id});
// 	}	
// });

module.exports = router;