'use strict';

const app = require('./src/app');

const {
	appConfig: { port },
} = require('./src/configs/config.mongodb');

const PORT = port || 8888;

const server = app.listen(PORT, () => {
	console.log(`IoT Server open at ${PORT}`);
});

// process.on('SIGINT', () => {
// 	server.close(() => {
// 		console.log(`IoT Server closed`);
// 	});
// });
