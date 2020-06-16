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

//static file
app.use(express.static(path.join(__dirname, 'public')));

//body-parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Home route
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Bookstore'
  });
})

//Route files
const genre = require('./routes/genre.route');
app.use('/genres', genre);

app.listen(3000, () => console.log('App listening at http://localhost:'+ 3000));