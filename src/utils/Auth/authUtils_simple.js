'use strict';

const JWT = require('jsonwebtoken');

const createTokenPair = async (payload, publicKey, privateKey) => {
	try {
		// accessToken
		const accessToken = await JWT.sign(payload, publicKey, {
			expiresIn: '7 days',
		});

		// refreshToken
		const refreshToken = await JWT.sign(payload, privateKey, {
			expiresIn: '30 days',
		});

		JWT.verify(accessToken, publicKey, (err, decode) => {
			if (err) {
				console.error(`[Verify]::error:: `, err);
			} else {
				console.log(`[Verify]::decode:: `, decode);
			}
		});

		return { accessToken, refreshToken };
	} catch (error) {}
};

module.exports = {
	createTokenPair,
};
