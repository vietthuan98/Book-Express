const express = require('express');
const router = express.Router();

const controllers = require('../controllers/genre.controllers');
const upload = require('../middlewares/multer.middleware');

router.get('/', controllers.getGenres);

router.post('/', controllers.postGenre);

const Genre = require('../models/genre.model');
const Book = require('../models/book.model');
const Author = require('../models/author.model');



module.exports = router;