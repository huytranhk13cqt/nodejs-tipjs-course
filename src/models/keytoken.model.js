'use strict';

const { Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'd_Key';
const COLLECTION_NAME = 'c_Key';

var keyTokenSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'dShop',
		},
		publicKey: {
			type: String,
			required: true,
		},
		refreshToken: {
			type: Array,
			default: [],
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	}
);

module.exports = model(DOCUMENT_NAME, keyTokenSchema);
