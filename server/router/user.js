const express = require('express');
const router = express.Router();

const { userController } = require('../controller');

// POST /signin
router.post('/signin', userController.signin.post);

// GET /signout
router.get('/signout', userController.signout.get);

// POST /signup
router.post('/signup', userController.signup.post);

module.exports = router;
