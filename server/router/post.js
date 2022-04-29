const express = require('express');
const router = express.Router();

const { postController } = require('../controller');

const loginRequired = require('../middleware/loginRequired');

// POST /post
router.post('/post', loginRequired, postController.post);

// GET /post
router.get('/allPost', postController.allPost);

// GET /post
router.post('/myPost', loginRequired, postController.myPost);

module.exports = router;
