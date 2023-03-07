'use strict';

const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const keyTokenService = require('./keytoken.service');
const { createTokenPair } = require('../Auth/authUtils');
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
		try {
			// hash password first
			const passwordHash = await bcrypt.hash(password, 10);

			// check Email existent ?
			const iotShop = await shopModel.findOne({ email }).lean();

			// if exist => return message
			if (iotShop) {
				throw new BadRequestError('Error: Shop already registered');
			}

			// if nonexistend => create new shop
			const newShop = await shopModel.create({
				name,
				password: passwordHash,
				email,
				roles: [ROLESHOP.SHOP],
			});

			if (newShop) {
				// create privateKey, publicKey
				const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
					modulusLength: 4096,

					publicKeyEncoding: {
						type: 'pkcs1',
						format: 'pem',
					},

					privateKeyEncoding: {
						type: 'pkcs1',
						format: 'pem',
					},
				});

				// save to database here !
				console.log({ privateKey, publicKey });

				// query database to get publicKey
				// ...

				// convert publicKey => publicKeyString
				const publicKeyString = await keyTokenService.createKeyToken({
					userId: newShop._id,
					publicKey,
				});

				// if convert failure => return error
				if (!publicKeyString) {
					return {
						code: 'xxxx',
						message: 'publicKeyString error',
					};
				}

				// generate publicKey from publicKeyString
				const publicKeyObject = crypto.createPublicKey(publicKeyString);

				// created refreshToken - accessToken => transfer to client (user)
				const tokens = await createTokenPair({ userId: newShop._id, email }, publicKeyObject, privateKey);

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
		} catch (error) {
			return {
				code: 'xxxx',
				message: error.message,
				status: 'error',
			};
		}
	};
}

module.exports = AccessService;
