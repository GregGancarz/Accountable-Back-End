const express	 = require('express');
const router     = express.Router();
const User		 = require('../models/user');
const bcrypt 	 = require('bcrypt');
const Category = require('../models/category');


//////////// REGISTER / LOGIN / LOGOUT ///////////

router.post('/register', async (req, res, next) => {
	console.log('--Registration has been initiated--');
	const userDbEntry = {};
	const password = req.body.password;
	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
	userDbEntry.email = req.body.email;
	userDbEntry.password = passwordHash
	try {
		const foundUser = await User.findOne({'email': req.body.email})
		if (foundUser) {	
			console.log("ERROR: The given email address is already attached to another account");
			res.json({
				status: 404,
				data: 'ERROR: The given email address is already attached to another account'
			});
		} else {
			const createdAccount = await User.create(userDbEntry);
			req.session.logged = true;
			req.session.email = req.body.email;
			res.json({
				status: 200,
				data: createdAccount
			});
		};
	} catch(err) {
		next(err);
	};
});


router.post('/login', async (req, res, next) => {
	console.log('--Login has been initiated--');
  	try {
		const foundUser = await User.findOne({'email': req.body.email});
		if (foundUser) {
		  	if (bcrypt.compareSync(req.body.password, foundUser.password)) {
				req.session.logged = true;
				req.session.email = req.body.email
				res.json({
					status: 200,
					data: foundUser
				})
		  	} else {
		  		res.json({
		  			status: 404,
		  			data: 'Your username or password is incorrect'
		  		})
		  	}
		} else {
		  	res.json({
		  			status: 404,
		  			data: 'Your username or password is incorrect'
		  	})
		}
  	} catch (err) {
		next(err);
  	}
});


router.get('/logout', ((req, res) => {
	console.log("--Logout initiated--");
	req.session.destroy((err) => {
    	if (err) {
      		res.send(err);
    	} else {
    		console.log("--Logout successful--");
    		res.json({
    			status: 200,
    			data: 'Logout successful'
    		})
		}	
	});
}));

//////////// REGISTER / LOGIN / LOGOUT /// ABOVE /////



/////////// PROFILE PAGES ///////////////////////

router.get('/:id', async (req, res, next) => {
	try {
		const foundUser = await User.findById(req.params.id);
		res.json({
			user: foundUser,
			status: 200,
		});
	} catch(err) {
		next(err)
	};
});

router.post('/:id', async (req, res, next) => {
	try {
		foundUser = await User.findById({_id: req.params.id});
		console.log(req.body, "<<<< req.body");
		const catName = req.body
		const createdCat = await Category.create(req.body);
		console.log(createdCat, "<<< The createdCat");
		console.log(foundUser.categories, "<<<< foundUser.categories BEFORE push");
		foundUser.categories.push(createdCat);
		console.log(foundUser.categories, "<<<< foundUser.categories AFTER push");

		res.json({
			status: 200,
			data: createdCat,
		});
	} catch(err) {
		next(err);
	};
});







module.exports = router;