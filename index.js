require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Connected to db'));

const app = express();

//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//static file
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
})

app.listen(3000, () => console.log('App listening at http://localhost:'+ 3000));