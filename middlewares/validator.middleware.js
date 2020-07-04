const { body } = require('express-validator')

module.exports = {
  registerValidator: [
    body('email', 'Email is required.').isEmail().notEmpty(),
    body('phone', 'Phone is required.').isNumeric().notEmpty(),
    body('password', 'Password is required.').isLength({min: 6, max: 30}).notEmpty()
  ],

  addGenreValidator: [
    body('name', 'Name is required.').notEmpty(),
    body('name', 'Name have to contain letters.').not().matches(/\d/)
  ],

  addBookValidator: [
    body('title', 'Title is required.').notEmpty(),
    body('description', 'Description is required.').notEmpty(),
    body('description', 'Description is too long.').isLength({max: 250}),
    body('price').notEmpty().withMessage('Price is required.').matches(/\d/).withMessage('Price have to contain numbers')
  ]
}
