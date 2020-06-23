const express = require('express');
const router = express.Router();

const controllers = require('../controllers/book.controllers');
const upload = require('../middlewares/multer.middleware');

router.get('/', controllers.getBooks);

router.get('/add', controllers.getAddBook);

router.post('/add', upload.single('img'), controllers.postAddBook)


module.exports = router;