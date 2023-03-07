'use strict';

const { findById } = require('../../services/apikey.services');

const HEADER = {
	API_KEY: 'x-api-key',
	AUTHORIZATION: 'authorization',
};

const apiKey = async (req, res, next) => {
	try {
		const key = req.headers[HEADER.API_KEY]?.toString();

		if (!key) {
			return res.status(403).json({
				message: '[key]::Forbiden Error',
			});
		}

		// check objKey
		const objKey = await findById(key);

		if (!objKey) {
			return res.status(403).json({
				message: '[objKey]::Forbiden Error',
			});
		}

		req.objKey = objKey;

		// to check permission
		return next();
	} catch (error) {}
};

const permission = (permission) => {
	return (req, res, next) => {
		// if permission nonexistent => return denied
		if (!req.objKey.permissions) {
			return res.status(403).json({
				message: 'Permission Denied',
			});
		}

		// check valid of permission
		console.log('permission::', req.objKey.permissions);
		const validPermission = req.objKey.permissions.includes(permission);

		if (!validPermission) {
			return res.status(403).json({
				message: 'Permission Denied',
			});
		}

		return next();
	};
};

const asyncHandler = (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch(next);
	};
};

module.exports = { apiKey, permission, asyncHandler };
