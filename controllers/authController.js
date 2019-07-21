const express	 = require('express');
const router     = express.Router();
const User		 = require('../models/user');
const bcrypt 	 = require('bcrypt');
const Category 	 = require('../models/category')
const nodemailer = require('nodemailer')







//////////////  REGISTER / DELETE  //////////////////
/////////////////////////////////////////////////////

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
				data: 'ERROR: The given email address is already attached to another account',
				message: 'That email is already associated with an account.'
			})
		} else {
			const createdAccount = await User.create(userDbEntry);
			let transporter = await nodemailer.createTransport({
    			service: 'yandex',
      			auth: {
        			user: 'accountableauto@yandex.com',
        			pass: '@ccountable0619'
      			}
    		});
    		let info = await transporter.sendMail({
    		  	from: 'accountableauto@yandex.com',
    		  	to: req.body.email,
    		  	subject: 'Welcome to Accountable!',
    		  	text: "Hello! \nThanks for registering with Accountable! Start tracking those expenses to get a better idea of your spending habits and finances!"
    		});
			req.session.logged = true;
			req.session.email = req.body.email;
			res.json({
				status: 200,
				data: createdAccount
			})
		}
	} catch(err) {
		next(err);	 
	}
});


router.delete('/user/:id', async (req, res, next) => {
	console.log("--Account deletion has been initiated--");
	try {
		const deletedUser = await User.findByIdAndDelete(req.params.id);
		const deletedUsersCats = Category.deleteMany({
			_id: {
        		$in: deletedUser.categories
      		}
		})
		req.session.destroy();
		res.json({
			status: 200,
			data: 'Account deletion was successful'
		})
	} catch(err) {
		next(err);
	}
})

//////////////////////////////////////////////////////////
////////////  REGISTER / DELETE  /////////  ABOVE  ///////









//////////////   LOG IN/OUT  //////////////////////////////
///////////////////////////////////////////////////////////

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
		  		console.log("--Password & email did not match--");
		  		res.json({
		  			status: 404,
		  			data: 'Your username or password is incorrect',
		  			message: 'Your username or password is incorrect'
		  		})
		  	}
		} else {
			console.log("--No account found with that email address--");
		  	res.json({
		  			status: 404,
		  			data: 'Your username or password is incorrect',
		  			message: 'Your username or password is incorrect'

		  	})
		}
  	} catch (err) {
		next(err);
		res.json({
			status: 404,
		})
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

/////////////////////////////////////////////////////////
///////////////   LOG IN/OUT   ////////////// ABOVE /////








//////////////   PROFILE PAGES   ///////////////////////
////////////////////////////////////////////////////////

router.get('/user/:id', async (req, res, next) => {
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

/////////////////////////////////////////////////////////
/////////////////  PROFILE PAGES  ///  ABOVE  ///////////






module.exports = router;