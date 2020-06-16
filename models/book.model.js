const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: [
    {type: Schema.Types.ObjectId, ref='Author'}
  ],
  descriptiton: {
    type: String,
    required: true,
    trim: true
  },
  genre: [
    {type: Schema.Types.ObjectId, ref='Genre'}
  ],
  price: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model('Book', bookSchema);

