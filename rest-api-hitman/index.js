const express = require('express');
const bodyParser = require('body-parser'); // Middleware (installed package)
const mongoose = require('mongoose'); // Has a connect method
const api = require("./routes/api");

// Set up Express app
const app = express();

// Connect to mongodb
mongoose.connect('mongodb://localhost/hitman4hire', {useNewUrlParser: true});
// Overriding deprecated mongoose Promise
mongoose.Promise = global.Promise;

// Used this middlware before I realised Express had its own parser
app.use(bodyParser.json());

// App will use routes so I can navigate to them (after '/api')
// Initialize routes with app.use()
app.use('/api', require('./routes/api')); // Middleware

// Our Custom Donation Web App Routes
//app.get('/hitmen', api.findAll);

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
  res.render('error');
});

// Middleware for error handling
app.use(function(err, req, res, next){
  //console.log(err);
  // Attach a 422 status code to this response
  res.status(422).send({error: err._message}) // Property of the error object
});

// Listen for requests either from Heroku environment variable OR 4000
app.listen(process.env.port || 4000, function(){
  console.log('Currently listening for requests...');
  // TODO: Handle requests
});
