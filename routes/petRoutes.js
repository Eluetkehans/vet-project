var express = require('express');
var Pet = require(__dirname + '/../models/pet');
var jsonParser = require('body-parser').json();

// Error Handler. Takes err then res.
var handleError = require(__dirname + "/../util/serverError");

var petsRoute = module.exports = exports = express.Router();

petsRoute.get('/pets', jsonParser, function(req, res) {
  // Find all the pets
  Pet.find('{}', function(err, docs) {
    if(err) handleError(err, res);
    // Send the array of all the found pets to client
    res.json({pets: docs});
  });
});