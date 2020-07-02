const passport = require('passport');

module.exports = {
  getLogin: async (req, res, next) => {
    let messages = req.flash('error');
    res.render('login', {
      title: "Log in",
      actionPath: `${req.originalUrl}`,
      messages
    })
  },

  postLogin: passport.authenticate('local.login', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
  }),

  getRegister: async (req, res, next) => {
    let messages = req.flash('error');
    console.log(messages);
    res.render('register', {
      title: "Register",
      actionPath: `${req.originalUrl}`,
      messages
    })
  },

  postRegister: passport.authenticate('local.register', {
    successRedirect: '/auth/login',
    failureRedirect: '/auth/register',
    failureFlash: true
  }),
}