'use strict';

const compression = require('compression');
const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const app = express();
require('dotenv').config();

// init middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

// init database
require('./databases/init.mongodb.lv1');

// Check Overload Connection Feature
// const { checkOverloadConnection } = require('./helpers/check.connect');
// checkOverloadConnection();

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
