const Author = require('../models/author.model');
const Genre = require('../models/genre.model');
const Book = require('../models/book.model');

module.exports = {
  getAuthor: async (req, res, next) => {
    try {
      const authors = await Author.find({});
      const authorNationals = authors.map(author => author.national)
      if((!req.query.national) || (req.query.national.toLowerCase() === 'all'))  {
        res.render('author', {
          title: 'Authors',
          actionPath: `${req.baseUrl}`,
          authors,
          authorNationals
        });
        return
      } else {
        const matchedAuthors = authors.filter(author => author.national.toLowerCase().indexOf(req.query.national.toLowerCase()) !== -1);
        res.render('author', {
          title: 'Authors',
          actionPath: `${req.baseUrl}`,
          authors: matchedAuthors,
          authorNationals
        })
        return;
      }
    } catch (err) {
      next(err);
    }
  },

  getAuthorBooks: async (req, res, next) => {
    try {
      const { authorId } = req.params;
      const books = await Book.find({author: authorId})
      const author = await Author.findById({_id: authorId});
      res.render('book', {
        title: `${author.name}'s books`,
        books
      })
    } catch (err) {
      next(err);
    }
  }

}