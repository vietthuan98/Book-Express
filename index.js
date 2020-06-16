require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Connected to db'));

const app = express();

//static file
app.use(express.static(path.join(__dirname, 'public')));
//view engine
app.set('view', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.send('Hello world');
})

app.listen(3000, () => console.log('App listening at http://localhost:'+ 3000));