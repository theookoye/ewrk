const express = require('express');
const firebase = require('firebase');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

// Route imports
const emergency = require('./routes/emergency');

// Express app instance
const app = express();

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
