const Genre = require('../models/genre.model');
const Book = require('../models/book.model');
const Author = require('../models/author.model');

//index
module.exports.getGenres = async (req, res, next) => {
  try {
    let genres = await Genre.find({});
    res.render('genre', {
      title: 'Genres',
      genres
    });
  } catch (err) {
    next(err);
  }
}

//create a genre
module.exports.postGenre = async (req, res, next) => {
  res.json(req.baseUrl)
}

//get books by id
module.exports.getGenreBook = async (req, res, next) => {
  try {
    const { genreId } = req.params;
    const books = await Book.find({genre: genreId});
    const genre = await Genre.findById({_id: genreId});
    res.render('book', {
      title: `${genre.name}'s books`,
      books
    })
  } catch (err) {
    next(err);
  }
}