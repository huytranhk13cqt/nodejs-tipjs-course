const compression = require('compression');
const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const app = express();

// init middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

// init database

// init routes
app.get('/', (req, res, next) => {
	const sensorData = {
		humid: 78.9,
		temp: 33.5,
	};

	return res.status(200).json({
		message: 'Hello Bro',
		metadata: sensorData.toString().repeat(100000),
	});
});

// handling error

module.exports = app;