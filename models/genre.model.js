const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genreSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

const Genre = mongoose.model('Genre', genreSchema);
module.exports = Genre;