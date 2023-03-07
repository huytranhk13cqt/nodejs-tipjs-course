'use strict';

const { model, Schema, Types } = require('mongoose');

const DOCUMENT_NAME = 'd_Shop';
const COLLECTION_NAME = 'c_Shop';

// Declare the Schema of the Mongo model .
var shopSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			maxLength: 150,
		},
		email: {
			type: String,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ['active', 'inactive'],
			default: 'inactive',
		},
		verify: {
			type: Schema.Types.Boolean,
			default: false,
		},
		roles: {
			type: Array,
			default: [],
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	}
);

module.exports = model(DOCUMENT_NAME, shopSchema);
