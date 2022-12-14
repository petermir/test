const path = require('path');

const express = require('express');

const db = require('./data/database');
const mainRoutes = require('./routes/main.routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
// Could add more middleware - e.g. session, body parsers etc.

app.use(mainRoutes);

app.use(function(error, req, res, next) {
  res.status(500).render('500');
})

// Adding an evn variable
let port = 5000;
// 'PORT' is the name heroku will use when it sets that variable
if (process.env.PORT) {
  port = process.env.PORT
}

db.initDatabase()
  .then(function () {
    // port 80 -> http
    // port 443 -> https
    app.listen(port);
  })
  .catch(function (error) {
    console.log('Connecting to the database failed!');
  });
