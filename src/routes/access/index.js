'use strict';

const express = require('express');
const accessController = require('../../controllers/access.controller');
const router = express.Router();

const { asyncHandler } = require('../../utils/Auth/checkAuth');

// signUp API
router.post('/shop/signup', asyncHandler(accessController.signUp));

module.exports = router;
