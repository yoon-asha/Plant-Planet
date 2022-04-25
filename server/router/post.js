const express = require('express');
const router = express.Router();

const { postController } = require('../controller');

const loginRequired = require('../middleware/loginRequired');

// POST /post
router.post('/post', loginRequired, postController.post);

module.exports = router;
