const express = require('express');
const router = express.Router();

const controllers = require('../controllers/auth.controllers');
const multer = require('../middlewares/multer.middleware');
const { registerValidator } = require('../middlewares/validator.middleware');

router.get('/login', controllers.getLogin);

router.post('/login', controllers.postLogin);

router.get('/register', controllers.getRegister);

router.post('/register', multer.single('avatar'), registerValidator, controllers.postRegister);

module.exports = router;