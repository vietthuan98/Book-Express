const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bookSchema = Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: [{ type: Schema.Types.ObjectId, ref: 'Author'}],
  description: {
    type: String,
    required: true,
    trim: true
  },
  genre: [{ type: Schema.Types.ObjectId, ref: 'Genre'}],
  price: {
    type: String,
    required: true,
    trim: true
  }
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;

