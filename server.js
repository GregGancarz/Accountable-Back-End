const express 	 = require('express');
const app 		 = express();
const bodyParser = require('body-parser');
const cors 		 = require('cors');
const session	 = require('express-session');
require('es6-promise');
require('isomorphic-fetch');
require('dotenv').config();
require('./db/db');

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUnititalized: false,
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const corsOptions = {
	origin: process.env.FRONTEND_URL,
	credentials: true,
	optionsSuccessesStatus: 200
	// was spelled 'optionsSuccesseesStatus' so change back if you get an error.
}
app.use(cors(corsOptions));

const authController     = require('./controllers/authController');
const categoryController = require('./controllers/categoryController');
// Fill in other controllers

//here too!
app.use('/auth', authController);
app.use('/category', categoryController);

app.listen(process.env.PORT || 9000, () => {
	console.log('Listening on port' + process.env.PORT);
});