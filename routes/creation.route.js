const express = require('express');
const router = express.Router();

const controllers = require('../controllers/creation.controllers');
const upload = require('../middlewares/multer.middleware');
const { addGenreValidator, addBookValidator, addAuthorValidator } = require('../middlewares/validator.middleware');

//Creation route

//add a genre
router.get('/', controllers.getCreation);
router.post('/', addGenreValidator, controllers.postGenre);

//then add a book
router.get('/:genreId/book', controllers.getBook);
router.post('/:genreId/book', upload.single('img'), addBookValidator, controllers.postBook);

//then add a author
router.get('/:genreId/book/:bookId/author', controllers.getAuthor);
router.post('/:genreId/book/:bookId/author', addAuthorValidator, controllers.postAuthor);

module.exports = router;