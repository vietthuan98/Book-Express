const passport = require('passport');
const User = require('../models/user.model');
const { Strategy } = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { validationResult } = require('express-validator');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  })
});

//register strategy
passport.use('local.register', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  // const errors = validationResult(req).array();
  // if (errors) {
  //   let messages = [];
  //   errors.forEach(error => messages.push(`${error.param.toUpperCase()}: ${error.msg}`));
  //   return done(null, false, req.flash('error', messages));
  // }
  const { firstName, lastName, address, phone, confirmPassword } = req.body;
  User.findOne({'email': email}, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, false, { message: 'Email is already in use.' });
    }
    if (password !== confirmPassword) {
      return done(null, false, { message: 'Confirmed password is wrong.' });
    }
    //create a new user
    const avatar = [''].concat(req.file.path.split('\\').slice(1)).join('/');
    let newUser = new User({
      email,
      firstName,
      lastName,
      address,
      phone,
      avatar
    });
    newUser.password = newUser.encryptPassword(password);
    newUser.save((err, result) => {
      if (err) {
        return done(err)
      }
      return done(null, newUser);
    }); 
  });
}));

//login strategy
passport.use('local.login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  User.findOne({email}, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: 'User does not exist.' });
    }
    if (!user.validPassword(password)) {
      return done(null, false, { message: 'Password is wrong.' });
    }
    return done(null, user);
  });
}));
