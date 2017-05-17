var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index');
var users = require('./routes/users');
var games = require('./routes/games');
var cors = require('cors');

var app = express();

const userController = require('./controllers/userController');

const passport = require('passport');
const Strategy = require('passport-local').Strategy
passport.use(new Strategy(userController.signIn));

app.use(cors())
app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*")
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token")
   next()
})


//database connection
mongoose.connect('mongodb://localhost/gamestore');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

app.use('/', index);
app.use('/users', users);
app.use('/games', games);



module.exports = app;
