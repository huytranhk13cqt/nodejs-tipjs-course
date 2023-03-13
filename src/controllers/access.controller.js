'use strict';

// const AccessService = require('../services/access.service'); --- Advanced
const AccessService = require('../services/access_simple.service');

const { OK, CREATED } = require('../core/success.response');

// ES6
class AccessController {
	signUp = async (req, res, next) => {
		new CREATED({
			message: 'Register OK!',
			metadata: await AccessService.signUp(req.body),
		}).send(res);
	};
}

module.exports = new AccessController();
