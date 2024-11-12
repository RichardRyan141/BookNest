const express = require('express');
const router = express.Router();
const { getReadingHistory } = require('../controllers/readHistoryController');

router.get('/', getReadingHistory);

module.exports = router;
