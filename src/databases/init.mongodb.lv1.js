'use strict';

const mongoose = require('mongoose');
const { countConnection } = require('../helpers/check.connect');

const localAdress = `mongodb://127.0.0.1:27017/iotShop`;

// singleton pattern - connect once time
class Database {
	constructor() {
		this.connect();
	}

	// connect
	connect(type = 'mongodb') {
		if (1 === 0) {
			mongoose.set('debug', true);
			mongoose.set('debug', { color: true });
		}
		mongoose
			.connect(localAdress)
			.then((_) => {
				console.log(`Connected MongoDB Success PRO`);
				countConnection();
			})
			.catch((err) => {
				console.log(`Error Connect: ${err}`);
			});
	}

	static getInstance() {
		if (!Database.instance) {
			Database.instance = new Database();
		}

		return Database.instance;
	}
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;
