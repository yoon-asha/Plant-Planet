const express = require('express');
const router = express.Router();

const { userController } = require('../controller');

// POST /signin
router.post('/signin', userController.signin.post);

// GET /signout
// POST 수정
router.post('/signout', userController.signout.post);

// POST /signup
router.post('/signup', userController.signup.post);

// GET /accessTokenRequest
router.get('/accessTokenRequest', userController.accessTokenRequest.get);

// GET /refreshTokenRequest
router.get('/refreshTokenRequest', userController.refreshTokenRequest.get);

module.exports = router;
