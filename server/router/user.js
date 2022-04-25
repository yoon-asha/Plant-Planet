const express = require('express');
const router = express.Router();

const { userController } = require('../controller');
const loginRequired = require('../middleware/loginRequired');

// POST /signin
router.post('/signin', userController.signin.post);

// GET /signout
// POST 수정
router.post('/signout', userController.signout.post);

// POST /signup
router.post('/signup', userController.signup.post);

// GET /accessTokenRequest
router.get(
  '/accessTokenRequest',
  loginRequired,
  userController.accessTokenRequest.get
);

// GET /refreshTokenRequest
router.get('/refreshTokenRequest', userController.refreshTokenRequest.get);

module.exports = router;
