require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true} );
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Connected to db'));

const app = express();

//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


//static file
app.use(express.static(path.join(__dirname, 'public')));



//Home route
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Bookstore'
  });
})

//Route files
const genre = require('./routes/genre.route');
const book = require('./routes/book.route');
app.use('/genres', genre);
app.use('/books', book);

app.listen(3000, () => console.log('App listening at http://localhost:'+ 3000));