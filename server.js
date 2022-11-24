const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

mongoose.connect(process.env.DATABASE_URL, function(err, connection) {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Connection to database established");
  }
});

const database = mongoose.connection;
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src')));

app.use('/', indexRouter);
app.use('/user', userRouter);

app.get('*', function(req, res) {
  res.sendFile('404.html', dir);
});

module.exports = app;
