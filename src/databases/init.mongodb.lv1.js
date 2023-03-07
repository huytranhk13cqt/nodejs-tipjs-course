'use strict';

const mongoose = require('mongoose');
const { countConnection } = require('../helpers/check.connect');
const {
	db: { host, port, name },
} = require('../configs/config.mongodb');

const localAdress = `mongodb://${host}:${port}/${name}`;

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
			.connect(localAdress, { maxPoolSize: 50 })
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
