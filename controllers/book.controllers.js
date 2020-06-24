const Book = require('../models/book.model');
const Genre = require('../models/genre.model');
const Author = require('../models/author.model');


module.exports.getBooks = async (req, res, next) => {
  try {
    const books = await Book.find({}).populate('author');
    res.render('book', {
      title: 'Book',
      books
    })
  } catch (err) {
    next(err);
  }
}

module.exports.getAddBook = async (req, res, next) => {
  const genres = await Genre.find({});
  res.render('addBook', {
    title: "Create a new book",
    genres
  })
}

module.exports.postAddBook = async (req, res, next) => {
  // const pathImg = [''].concat(req.file.path.split('\\').slice(1)).join('/');

  // //save author
  // let newAuthor = new Author({
  //   name: req.body.author,
  //   national:  req.body.national
  // });

  // let newGenre = new Genre({
  //   name: req.body.genre
  // });

  // let newBook = new Book({
  //   title: req.body.title,
  //   description: req.body.description,
  //   img: pathImg,
  //   price: req.body.price
  // });
  
  
}