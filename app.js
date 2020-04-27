const { join } = require('path');
const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const serveFavicon = require('serve-favicon');
const indexRouter = require('./routes/index');

const app = express();

app.use(serveFavicon(join(__dirname, 'public/images', 'favicon.ico')));
app.use(express.static(join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.sendFile(join(__dirname, './views', 'error.html'));
});

module.exports = app;
