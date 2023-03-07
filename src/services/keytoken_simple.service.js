'use strict';

const keytokenModel = require('../models/keytoken_simple.model');

class keyTokenService {
	static createKeyToken = async ({ userId, publicKey, privateKey }) => {
		try {
			const tokens = await keytokenModel.create({
				user: userId,
				publicKey,
				privateKey,
			});

			return tokens ? tokens.publicKey : null;
		} catch (error) {
			return error;
		}
	};
}

module.exports = keyTokenService;
