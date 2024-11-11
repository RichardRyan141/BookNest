const express = require('express');
const router = express.Router();
const { getBooks, addBook } = require('../controllers/bookController');

router.get('/', getBooks);
router.post('/books', addBook);


module.exports = router;
