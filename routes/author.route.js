const express = require('express');
const router = express.Router();

const controllers = require('../controllers/author.controllers');

router.get('/', controllers.getAuthor);


module.exports = router;