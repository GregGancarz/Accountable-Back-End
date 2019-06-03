const express 	 = require('express');
const app 		 = express();
const bodyParser = require('body-parser');
const cors 		 = require('cors');
const session	 = require('express-session');
require('es6-promise');
require('isomorphic-fetch');
require('dotenv').config();
require('./db/db');



