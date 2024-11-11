const express = require('express');
const router = express.Router();
const { getBooks, addBook, editBook } = require('../controllers/bookController');

router.get('/', getBooks);
router.post('/books', addBook);
router.put('/books/:id', editBook);

module.exports = router;
