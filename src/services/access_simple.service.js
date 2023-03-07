'use strict';

const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('node:crypto');
const keyTokenService = require('./keytoken_simple.service');
const { createTokenPair } = require('../utils/Auth/authUtils_simple');
const { getInfoData } = require('../utils');
const { BadRequestError, ConflictRequestError } = require('../core/error.response');

// S : 19 - W : 23 - E : 5 - A : 1
const ROLESHOP = {
	SHOP: '0019',
	WRITER: '0023',
	EDITOR: '0005',
	ADMIN: '0001',
};

class AccessService {
	static signUp = async ({ name, password, email }) => {
		// try {
		// check Email existent ?
		const iotShop = await shopModel.findOne({ email }).lean();

		// if exist => return message
		if (iotShop) {
			throw new BadRequestError('Error: Shop already registered');
		}

		// hash password first
		const passwordHash = await bcrypt.hash(password, 10);

		// if nonexistend => create new shop
		const newShop = await shopModel.create({
			name,
			password: passwordHash,
			email,
			roles: [ROLESHOP.SHOP],
		});

		console.log(4, newShop);

		if (newShop) {
			// create privateKey, publicKey
			const privateKey = crypto.randomBytes(64).toString('hex');
			const publicKey = crypto.randomBytes(64).toString('hex');

			// create key pair => stored to database
			const keyStored = await keyTokenService.createKeyToken({
				userId: newShop._id,
				publicKey,
				privateKey,
			});

			// if create failure => return error
			if (!keyStored) {
				throw new BadRequestError('Error: keyStored error');
			}

			// created refreshToken - accessToken => transfer to client (user)
			const tokens = await createTokenPair({ userId: newShop._id, email }, publicKey, privateKey);

			console.log(`Created Token Success:: `, tokens);

			return {
				code: 201,
				metadata: {
					shop: getInfoData({ fields: ['_id', 'name', 'email'], object: newShop }),
					tokens,
				},
			};
		}

		return {
			code: 200,
			metadata: null,
		};
		// } catch (error) {
		// 	throw new BadRequestError('Error: signUp error');
		// }
	};
}

module.exports = AccessService;
