const express = require('express');
const router = express.Router();
const { getRecommendations, chatBot } = require('../controllers/aiController');

router.get('/recommendations', getRecommendations);
router.post('/chat', chatBot);

module.exports = router;
