const express = require('express');
const router = express.Router();

const { likeController } = require('../controller');

// POST /like
router.post('/like', likeController.like.post);

// POST /unlike
router.post('/unlike', likeController.unlike.post);

// GET /likeInfo
router.post('/likeInfo', likeController.likeInfo.get);

module.exports = router;
