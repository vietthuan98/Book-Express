const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true,
    required: true
  },
  phone: {
    type: String,
    trim: true,
    required: true
  },
  avatar: {
    type: String,
    trim: true,
    default: '/uploads/img/default_avatar.png'
  }
});

userSchema.methods.encryptPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);


userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);
