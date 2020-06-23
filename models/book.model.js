const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bookSchema = Schema({
  title: {
    type: String,
    trim: true,
  },
  author: { type: Schema.Types.ObjectId, ref: 'Author'},
  img: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  genre: { type: Schema.Types.ObjectId, ref: 'Genre'},
  price: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;

