const express = require('express');
const router = express.Router();

const controllers = require('../controllers/creation.controllers');
const upload = require('../middlewares/multer.middleware');

//Creation route

//add a genre
router.get('/', controllers.getCreation);
router.post('/', controllers.postGenre);

//then add a book
router.get('/:genreId/book', controllers.getBook);
router.post('/:genreId/book', upload.single('img'), controllers.postBook);

//then add a author
router.get('/:genreId/book/:bookId/author', controllers.getAuthor);
router.post('/:genreId/book/:bookId/author', controllers.postAuthor);

module.exports = router;