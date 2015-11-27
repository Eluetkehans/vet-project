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

petsRoute.get('/pets/:id', function(req, res) {
  // Find a specific pet

  // Even though we ever only want one result, we use find() over findOne()
  // so that the return value will be an array just like the /pets route.
  // That way we can use the same code and styling on the front end whether
  // people are searching for one specific pet, or all pets.
  Pet.find({_id: req.params.id}, function(err, docs) {
    if(err) handleError(err, res);
    res.json({pets: docs});
  });
});

petsRoute.post('/pets', jsonParser, function(req, res) {
  // Create a new pet in db
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

petsRoute.delete('/pets/:id', function(req, res) {
  // Deletes a specific pet from the db
  Pet.findOneAndRemove({_id: req.params.id}, function(err, doc) {
    if(err) handleError(err, res);
    res.json({'msg': 'success'});
  });
});

petsRoute.put('/pets/:id', jsonParser, function(req, res) {
  // Updates a specific pet in the db
  // Takes an updateData object on req.body with the key value pairs being
  // altered.
  
  // Mongo _ids can not be updated, so we need to make an object without
  // the _id.
  var updateObj = {};
  updateObj.name = req.body.updateData.name;
  updateObj.gender = req.body.updateData.gender;
  updateObj.size = req.body.updateData.size;
  updateObj.color = req.body.updateData.color;
  updateObj.type = req.body.updateData.type;
  Pet.findOneAndUpdate({_id: req.params.id}, updateObj, function(err, doc) {
    if(err) handleError(err, res);
    res.json({'msg': 'success'});
  });
});
