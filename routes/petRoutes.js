var express = require('express');
var Pet = require(__dirname + '/../models/pet');
var jsonParser = require('body-parser').json();

// Error Handler. Takes err then res.
var handleError = require(__dirname + "/../util/serverError");

var petsRoute = module.exports = exports = express.Router();

petsRoute.get('/pets', function(req, res) {
  // Find all the pets
  Pet.find('{}', function(err, docs) {
    if(err) handleError(err, res);
    // Send the array of all the found pets to client
    res.json({pets: docs});
  });
});

petsRoute.post('/pets', jsonParser, function(req, res) {
  // Takes an object called createPet attached to req.body with all fields
  // necessary to create a Pet doc

  // new Pet that can be saved into our db.
  var newPet = new Pet();
  // Fill in needed document fields
  newPet.name = req.body.createPet.name;
  newPet.type = req.body.createPet.type;
  newPet.size = req.body.createPet.size;
  newPet.gender = req.body.createPet.gender;
  newPet.color = req.body.createPet.color;
  // Save into db
  newPet.save(function(err, doc) {
    if (err) handleError (err, res);
    // Send success message to client
    res.json({'msg': 'success'});
  });

});