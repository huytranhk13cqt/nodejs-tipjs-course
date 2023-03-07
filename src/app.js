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
app.use(express.json());
app.use(express.urlencoded({ extends: true }));

// init database
require('./databases/init.mongodb.lv1');

// Check Overload Connection Feature
// --------------------- const { checkOverloadConnection } = require('./helpers/check.connect');
// --------------------- checkOverloadConnection();

// init routes
app.use('/', require('./routes'));

// handling error
app.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	const statusCode = error.status || 500;

	return res.status(statusCode).json({
		status: 'error',
		code: statusCode,
		message: error.message || 'Interal Server Error',
	});
});

module.exports = app;
