'use strict';

const STATUSCODE = {
	OK: 200,
	CREATED: 201,
};

const REASONSTATUSCODE = {
	OK: 'Success',
	CREATED: 'Created!',
};

class SuccessResponse {
	constructor({ message, statusCode = STATUSCODE.OK, reasonStatusCode = REASONSTATUSCODE.OK, metadata = {} }) {
		this.message = !message ? reasonStatusCode : message;
		this.status = statusCode;
		this.metadata = metadata;
	}

	send(res, headers = {}) {
		return res.status(this.status).json(this);
	}
}

class OK extends SuccessResponse {
	constructor({ options = {}, message, metadata }) {
		super({ message, metadata });
		this.options = options;
	}
}

class CREATED extends SuccessResponse {
	constructor({
		options = {},
		message,
		statusCode = STATUSCODE.CREATED,
		reasonStatusCode = REASONSTATUSCODE.CREATED,
		metadata,
	}) {
		super({ message, statusCode, reasonStatusCode, metadata });
		this.options = options;
	}
}

module.exports = {
	OK,
	CREATED,
};
