const express = require('express');
const router = express.Router();
const { purchaseChapter, getPurchaseHistory } = require('../controllers/purchaseController');

router.get('/:bookId/:chapter', getPurchaseHistory);
router.post('/:bookId/chapters', purchaseChapter);

module.exports = router;
