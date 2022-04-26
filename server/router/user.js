const express = require('express');
const router = express.Router();

const { userController } = require('../controller');

// POST /signin
router.post('/signin', userController.signin);

// POST /signup
router.post('/signup', userController.signup);

module.exports = router;
