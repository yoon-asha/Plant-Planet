const express = require('express');
const router = express.Router();

const { usersController } = require('../controller');

// POST /signin
router.post('/signin', usersController.signin.post);

// GET /signout
router.get('/signout', usersController.signout.get);

// POST /signup
router.post('/signup', usersController.signup.post);

module.exports = router;
