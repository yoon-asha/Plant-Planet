const express = require('express');
const router = express.Router();

const { likeController } = require('../controller');

const loginRequired = require('../middleware/loginRequired');

// POST /like
router.post('/like', loginRequired, likeController.like);

// POST /unlike
router.post('/unlike', loginRequired, likeController.unlike);

// GET /likeInfo
router.post('/likeInfo', loginRequired, likeController.likeInfo);

module.exports = router;
