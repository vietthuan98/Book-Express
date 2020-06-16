const Genre = require('../models/genre.model');

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