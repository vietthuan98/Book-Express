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


module.exports.getGenBook = async (req, res, next) => {
  try {
    const { genreId } = req.params
    const genre = await Genre.findById({_id: genreId});
    res.render('addBook', {
      pathAction: `/genres/${genreId}/book`,
      title: 'Add a new book',
      genre: genre
    })
  } catch (err) {
    next(err);
  }
}

module.exports.postGenBook = async (req, res, next) => {
  try {
    const pathImg = [''].concat(req.file.path.split('\\').slice(1)).join('/');
    //find Genre
    const { genreId } = req.params;
    const genre = await Genre.findById({_id: genreId});
    // create a new book
    const newBook = new Book({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      img: pathImg
    });
    //assign genre's id as book's genre
    newBook.genre = genre;
    //save book
    await newBook.save();
    //add new book to genre's book array
    await genre.books.push(newBook);
    //save genre
    await genre.save();
    //done!

    res.redirect(`/genres/${genreId}/book/${newBook._id}/author`);
  } catch (err) {
    next(err);
  }
}

module.exports.getGenBookAuthor = async (req, res, next) => {
  try {
    const { genreId, bookId } = req.params;
    const genre = await Genre.findById({_id: genreId});
    const book = await Book.findById({_id: bookId});
    const authors = await Author.find();

    res.render('addAuthor', {
      pathAction: `/genres/${genreId}/book/${bookId}/author`,
      book,
      genre,
      authors
    });
  } catch (err) {
    next(err);
  }
}

module.exports.postGenBookAuthor = async (req, res, next) => {
  try { 
    const { genreId, bookId } = req.params;
    const book = await Book.findById({_id: bookId});
    //check author
    let author;
    const notAuthor = /\.{3}/g.test(req.body.author);
    if(!notAuthor){
      //existed
      author = await Author.find({name: req.body.author});
    } else {
      //not existed
      author = new Author({
        name: req.body.anotherAuthor,
        national: req.body.national
      });
    }
    //add book to author's book array
    author.books.push(book);
    await author.save();
    //assign book.author to author's id
    book.author = author;
    await book.save()
    //done!
    console.log('success');
    res.redirect('/')
  } catch (err) {
    next(err);
  };
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