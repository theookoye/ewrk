const express = require('express');
const firebase = require('firebase');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

// Route imports
const emergency = require('./routes/emergency');

// Express app instance
const app = express();

// Firebase instance
const config = {
	apiKey: 'AIzaSyDeivRAXdWUWAi2IVYOM9-IrJHbzl1oXRE',
	authDomain: 'ewrk2019.firebaseapp.com',
	databaseURL: 'https://ewrk2019.firebaseio.com',
	projectId: 'ewrk2019',
	storageBucket: 'ewrk2019.appspot.com',
	messagingSenderId: '998235068240'
};

firebase.initializeApp(config);
const db = firebase.firestore();

// Express Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cors({
		orgin: '*'
	})
);
app.use(morgan('dev'));

// Routes
app.use('/emergency', emergency);

const port = process.env.PORT || 3000;

try {
	app.listen(port);
	console.log(`EWRK running on port ${port}`);
} catch (error) {
	console.log(error);
}
