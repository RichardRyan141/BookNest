const express = require('express');
const router = express.Router();
const { getBooks, addBook, editBook, getBookDetails } = require('../controllers/bookController');
const { getChapter, createChapter } = require('../controllers/chapterController');

router.get('/', getBooks);
router.post('/', addBook);

router.get('/:id', getBookDetails);
router.put('/:id', editBook);

router.get('/:bookId/:chapter', getChapter);
router.post('/:bookId/chapters', createChapter);

module.exports = router;
