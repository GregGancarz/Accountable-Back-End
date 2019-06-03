const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Category = require('../models/category');

router.post('/:id', async (req, res, next) => {
	try {
		//foundUser = await User.findById({_id: req.params.id});
		console.log(req.body, "<<<< req.body");
		const catName = req.body
		const createdCat = await Category.create(req.body);
		//foundUser.categories.push(createdCat);
		res.json({
			status: 200,
			data: createdCat,
		});
	} catch(err) {
		next(err);
	};
});

module.exports = router;


// email: fakestEmailEver@dne.com
// password: password1
// _id: 5cf56a9fda6f2733f4e15b2b