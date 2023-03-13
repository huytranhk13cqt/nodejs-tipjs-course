'use strict';

const STATUSCODE = {
	FORBIDEN: 403,
	CONFLICT: 409,
};

const REASONSTATUSCODE = {
	FORBIDEN: 'Bad Request Error',
	CONFLICT: 'Conflict Error',
};

// inherit node.js class 'Error'
class ErrorResponse extends Error {
	constructor(message, status) {
		super(message);
		this.status = status;
	}
}

class ConflictRequestError extends ErrorResponse {
	constructor(message = REASONSTATUSCODE.CONFLICT, statusCode = STATUSCODE.FORBIDEN) {
		super(message, statusCode);
	}
}

class BadRequestError extends ErrorResponse {
	constructor(message = REASONSTATUSCODE.CONFLICT, statusCode = STATUSCODE.FORBIDEN) {
		super(message, statusCode);
	}
}

module.exports = { ConflictRequestError, BadRequestError };
