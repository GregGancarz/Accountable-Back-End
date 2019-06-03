const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Category = require('../models/category');

// email: fakestEmailEver@dne.com
// password: password1
// _id: 5cf56a9fda6f2733f4e15b2b

router.post('/:id', async (req, res, next) => {
	console.log("--Category creation has been initiated---");
	try {
		foundUser = await User.findById({_id: req.params.id});
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

module.exports = router;


