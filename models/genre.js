const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genreSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = mongoose.models('Genre', genreSchema);