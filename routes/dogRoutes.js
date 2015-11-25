var express = require('express');
var Pet = require(__dirname + '/../models/pet');

// Error Handler. Takes err then res.
var handleError = require(__dirname + "/../util/serverError");

var catsRoute = module.exports = exports = express.Router();

catsRoute.get('/dogs/:size', function(req, res) {
  // Find a list of dogs by size

  // Make more complicated queries seperate variables, that way you can
  // explode them out to make them more human readable
  var query = {
               $and: [
                      {size: req.params.size},
                      {type: 'dog'}
                     ]
              };

  Pet.find(query, function(err, docs) {
    if(err) handleError(err, res);
    res.send({dogs: docs});
  });
});