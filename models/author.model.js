const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  national: {
    type: String,
    trim: true
  },
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

const Author = mongoose.model('Author', authorSchema);
module.exports = Author;