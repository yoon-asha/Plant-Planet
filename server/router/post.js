const express = require('express');
const router = express.Router();

const { postController } = require('../controller');

// POST /post
router.post('/post', postController.post.post);

module.exports = router;
