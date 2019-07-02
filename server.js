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

// app.use(bodyParser.urlencoded({extended: false})); // to enable easy use of Postman for development
app.use(bodyParser.json());

const corsOptions = {
	origin: process.env.FRONTEND_URL,
	credentials: true,
	optionsSuccessesStatus: 200
}
app.use(cors(corsOptions));

const authController     = require('./controllers/authController');
const categoryController = require('./controllers/categoryController');
const expenseController = require('./controllers/expenseController');
const goalController = require('./controllers/goalController');

app.use('/auth', authController);
app.use('/category', categoryController);
app.use('/expense', expenseController);
app.use('/goal', goalController);

app.listen(process.env.PORT || 9000, () => {
	console.log('Listening on port' + process.env.PORT);
});