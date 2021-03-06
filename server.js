var express = require('express');
var app = express();
var mongoose = require('mongoose');
// Only use JSON parser. Base body parser has a security flaw.
var jsonParser = require('body-parser').json();

// Check for Mongo path enviromental variable MONGO_URL on local machine,
// if not use default.
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/petdb');

// Check for a port specified in PORT enviromental variable on local machine.
var port = process.env.PORT || 3000;

// Include routes

var petsRouter = require(__dirname + '/routes/petRoutes');
app.use('/api', petsRouter);

var catsRouter = require(__dirname + '/routes/catRoutes');
app.use('/api', catsRouter);

var dogsRouter = require(__dirname + '/routes/dogRoutes');
app.use('/api', dogsRouter);

// Start router
app.listen(port, function() {
  console.log('server up on port: ' + port);
});