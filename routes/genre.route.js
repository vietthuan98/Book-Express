const express = require('express');
const router = express.Router();

const controllers = require('../controllers/genre.controllers');

router.get('/', controllers.getGenres);

router.post('/', controllers.postGenre);

// router.get('/:id', controllers.getBooksByGenreId);

module.exports = router;