require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport');

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true} );
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Connected to db'));

require('./config/passport');

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

//cookie
app.use(cookieParser());

//session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

//flash 
app.use(flash());

//passport
app.use(passport.initialize());
app.use(passport.session());






//Home route
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Bookstore'
  });
})

//Route files
const genre = require('./routes/genre.route');
const book = require('./routes/book.route');
const author = require('./routes/author.route');
const creation = require('./routes/creation.route');
const auth = require('./routes/auth.route');

app.use('/auth', auth);   
app.use('/genres', genre);
app.use('/books', book);
app.use('/authors', author);
app.use('/creation', creation);


app.listen(3000, () => console.log('App listening at http://localhost:'+ 3000));