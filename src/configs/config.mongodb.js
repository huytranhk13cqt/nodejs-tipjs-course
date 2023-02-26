'use strict';

// level 0
const developmentConfig = {
	appConfig: {
		port: process.env.DEV_APP_PORT || 3000,
	},
	db: {
		host: process.env.DEV_DB_HOST || '127.0.0.1',
		port: process.env.DEV_DB_PORT || 27017,
		name: process.env.DEV_DB_NAME || 'iotShopDev',
	},
};

// level 1
const productionConfig = {
	appConfig: {
		port: process.env.PRODUCT_APP_PORT || 3001,
	},
	db: {
		host: process.env.PRODUCT_DB_HOST || '127.0.0.1',
		port: process.env.PRODUCT_DB_PORT || 27017,
		name: process.env.PRODUCT_DB_NAME || 'iotShopProduct',
	},
};

const config = { developmentConfig, productionConfig };
const env = process.env.NODE_ENVIRONMENT || 'developmentConfig';

console.log(config[env], env);

// default : export developmentConfig
module.exports = config[env];
