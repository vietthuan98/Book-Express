const Genre = require('../models/genre.model');
const Book = require('../models/book.model');

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
  try {
    const genre = new Genre({
      name: req.body.name
    })
    await genre.save();
    let genres = await Genre.find({});
    res.render('genre', {
      title: 'Genres',
      genres
    });
  } catch (err) {
    next(err);
  }
}

//render book by genre id
// module.export.getBooksByGenreId = async (req, res, next) => {
//   const query = {genre: req.params.id};
//   try {
//     const books = Book.find(query)
//     res.render('book', {
//       title: 'Book',
//       books
//     })
//   } catch (err) {
//     next(err);
//   }
// }