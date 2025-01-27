var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/products');
var commentRouter = require('./routes/comments');
var uploadRouter = require('./routes/uploadRouter');


var app = express();



var cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:8000',
  credentials: true,
  optionSuccessStatus: 200
}
app.use(cors(corsOptions))




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




//db 
require('./db')



require('./authenticate')(passport);

app.use(passport.initialize());






app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/comments', commentRouter);
app.use('/upload', uploadRouter);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error',{title:'hata', error: err});
});


module.exports =  app ;