const express = require('express');
const router = express.Router();

const controllers = require('../controllers/genre.controllers');
const upload = require('../middlewares/multer.middleware');

router.get('/', controllers.getGenres);

router.post('/', controllers.postGenre);

const Genre = require('../models/genre.model');
const Book = require('../models/book.model');
const Author = require('../models/author.model');

//getGenBook
router.get('/:genreId/book', controllers.getGenBook);

//postGenBook
router.post('/:genreId/book', upload.single('img'), controllers.postGenBook);

router.get('/:genreId/book/:bookId/author', controllers.getGenBookAuthor);

router.post('/:genreId/book/:bookId/author', controllers.postGenBookAuthor);

module.exports = router;