'use strict';

const { Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'd_Key';
const COLLECTION_NAME = 'c_Key';

// Declare the Schema of the Mongo model .
var keyTokenSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'd_Shop',
		},

		publicKey: {
			type: String,
			required: true,
		},

		privateKey: {
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
