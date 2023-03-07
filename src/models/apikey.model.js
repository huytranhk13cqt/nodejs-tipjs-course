'use strict';

const { model, Schema, Types } = require('mongoose');

const DOCUMENT_NAME = 'd_apiKey';
const COLLECTION_NAME = 'c_apiKey';

// Declare the Schema of the Mongo model
var apiKeySchema = new Schema(
	{
		key: {
			type: String,
			required: true,
			unique: true,
		},
		status: {
			type: Boolean,
			default: true,
		},
		permissions: {
			type: [String],
			required: true,
			default: ['0000', '1111', '2222'],
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	}
);

//Export the model
module.exports = model(DOCUMENT_NAME, apiKeySchema);
