const express = require('express');
const router = express.Router();
const Pusher = require('pusher');
const credentials = require('../cred');
const africastalking = require('africastalking')(credentials.AT);
const firebase = require('firebase');

// Global Variables
const pusher = new Pusher({
	appId: '747945',
	key: 'b01d31d9bfa0bee20f74',
	secret: '6e879a504131201d93df',
	cluster: 'ap2',
	useTLS: true
});

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

const start = `CON Select Disaster:
1. Flood
2. Wild Fire
3. Landslide
4. Rockslide
5. Drought
6. Heat Wave
7. Epidemic
`;

let emergency = {
	disaster: '',
	location: ''
};

router.post('/', (req, res) => {
	// USSD server for options
	console.log(req.body);
	let message = '';

	const { sessionId, serviceCode, phoneNumber, text } = req.body;
	const textValue = text.split('*').length;

	if (text === '') message = start;
	else if (textValue === 1) {
		message = `CON Enter location : `;
	} else {
		message = `END  Assistance is on its way.`;
	}

	switch (text.split('*')[0]) {
		case 1:
			emergency['disaster'] = 'flood';
			break;
		case 2:
			emergency['disaster'] = 'wild fire';
			break;
		case 3:
			emergency['disaster'] = 'landslide';
			break;
		case 4:
			emergency['disaster'] = 'rockslide';
			break;
		case 5:
			emergency['disaster'] = 'drought';
			break;
		case 6:
			emergency['disaster'] = 'heat wave';
			break;
		case 7:
			emergency['disaster'] = 'epidemic';
			break;
	}
	console.log(`emergency: ${emergency}`);

	try {
		// Push data to firestore

		db.collection('emergencies')
			.add(emergency)
			.then(docRef => {
				console.log('Document written with ID: ', docRef.id);
			})
			.catch(error => {
				console.error('Error adding document: ', error);
			});

		res.contentType('text/plain');
		res.status(200).send(message);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
