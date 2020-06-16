const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  nationality: {
    type: String,
    required: true,
    trim: true
  },
  book: [
    {type: Schema.Types.ObjectId, ref='Book'}
  ]
});

module.exports = mongoose.model('Author', authorSchema);