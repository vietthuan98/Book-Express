const express = require('express');
const router = express.Router();

const controllers = require('../controllers/author.controllers');

router.get('/', controllers.getAuthor);

router.get('/:authorId/books', controllers.getAuthorBooks);


module.exports = router;