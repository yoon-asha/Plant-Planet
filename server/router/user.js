const express = require('express');
const router = express.Router();

const { userController } = require('../controller');

const loginRequired = require('../middleware/loginRequired');

// POST /signin
router.post('/signin', userController.signin);

// POST /signup
router.post('/signup', userController.signup);

// GET /recomList
router.get('/recomList', loginRequired, userController.recomList);

module.exports = router;
