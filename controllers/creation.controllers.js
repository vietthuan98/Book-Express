const Genre = require('../models/genre.model');
const Book = require('../models/book.model');
const Author = require('../models/author.model');
const { findOne } = require('../models/genre.model');


module.exports = {
  getCreation: async (req, res, next) => {
    try {
      let genres = await Genre.find({});
      res.render('creation', {
        title: 'Create a new genre',
        actionPath: `${req.baseUrl}`,
        genres
      });
    } catch (err) {
      next(err);
    }
  },

  //add a new genre
  postGenre: async (req, res, next) => {
    try {
      const genre = await Genre.findOne({name: req.body.name});
      if(!genre) {
        console.log('chua ton tai');
        const newGenre = new Genre({
          name: req.body.name
        })
        await newGenre.save();
        const genres = await Genre.find({});
        res.render('creation', {
          title: 'Genres',
          actionPath: `${req.baseUrl}`,
          genres
        });
        return;
      }
      const genres = await Genre.find({});
      res.render('creation', {
        title: 'Genres',
        actionPath: `${req.baseUrl}`,
        genres
      });
    } catch (err) {
      next(err);
    }
  },

  getBook: async (req, res, next) => {
    try {
      const { genreId } = req.params
      const genre = await Genre.findById({_id: genreId});
      res.render('addBook', {
        pathAction: `${req.baseUrl}/${genreId}/book`,
        title: 'Add a new book',
        genre: genre
      })
    } catch (err) {
      next(err);
    }
  },

  postBook: async (req, res, next) => {
    try {
      //config path url for book's img 
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
  
      res.redirect(`${req.baseUrl}/${genreId}/book/${newBook._id}/author`);
    } catch (err) {
      next(err);
    }
  },

  getAuthor: async (req, res, next) => {
    try {
      const { genreId, bookId } = req.params;
      const genre = await Genre.findById({_id: genreId});
      const book = await Book.findById({_id: bookId});
      const authors = await Author.find();
  
      res.render('addAuthor', {
        pathAction: `${req.baseUrl}/${genreId}/book/${bookId}/author`,
        book,
        genre,
        authors
      });
    } catch (err) {
      next(err);
    }
  },

  postAuthor: async (req, res, next) => {
    try { 
      const { genreId, bookId } = req.params;
      const book = await Book.findById({_id: bookId});
      //check author
      let author;
      const notAuthor = /^Choose\.{3}$/g.test(req.body.author); //req.body.author ='Choose...' => false
      if(!notAuthor){
        //existed
        author = await Author.findOne({name: req.body.author});
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


}
