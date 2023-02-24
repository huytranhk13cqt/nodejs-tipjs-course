'use strict';

const mongoose = require('mongoose');
const os = require('os');
const process = require('process');
const _SECONDS = 5000;

// count connection
const countConnection = () => {
	const numConnection = mongoose.connections.length;
	console.log(`Number of connections: ${numConnection}`);
};

// check connection overload
const checkOverloadConnection = () => {
	setInterval(() => {
		const numConnection = mongoose.connections.length;
		const numCores = os.cpus().length;
		const memoryUsage = process.memoryUsage().rss;

		// Example : maximum number of connections based on number `os cores`
		// Example : each core can handle 5 connections
		const maxConnections = numCores * 5;

		console.log(`Activate connections: ${numConnection} `);
		console.log(`Memory usage: ${memoryUsage / (1024 * 1024)} MB`);

		if (numConnection > maxConnections) {
			console.log(`Connection overload detected !`);
		}
	}, _SECONDS); // Monitor every 5s
};

module.exports = {
	countConnection,
	checkOverloadConnection,
};
