'use strict';

const mongoose = require('mongoose');

const localAdress = `mongodb://127.0.0.1:27017/iotShop`;

// many connect
mongoose
	.connect(localAdress, { maxPoolSize: 50 })
	.then((_) => {
		console.log(`Connected MongoDB Success COMMON`);
	})
	.catch((err) => {
		console.log(`Error Connect: ${err}`);
	});

if (1 === 1) {
	mongoose.set('debug', true);
	mongoose.set('debug', { color: true });
}

module.exports = mongoose;
