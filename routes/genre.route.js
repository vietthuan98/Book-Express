const express = require('express');
const router = express.Router();

const controllers = require('../controllers/genre.controllers');
const upload = require('../middlewares/multer.middleware');

router.get('/', controllers.getGenres);

router.post('/', controllers.postGenre);

router.get('/:genreId/books', controllers.getGenreBook);

module.exports = router;