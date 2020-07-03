const { body } = require('express-validator')

module.exports = {
  registerValidator: [
    body('email').isEmail(),
    body('phone').isNumeric(),
    body('password').isLength({min: 6, max: 30})
  ],
}