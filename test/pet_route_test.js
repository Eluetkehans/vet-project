var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var mongoose = require('mongoose');

// Set test db path on local machine
process.env.MONGO_URL = 'mongodb://localhost/pet_test';

// Pull in our models
var Pet = require(__dirname + '/../models/pet');

// set beggining of URL for later convenience
var url = '/localhost:3000/api';

// require in our server so it auto-runs when this test is run.
require(__dirname + '/../server');

describe('Pet routes', function() {
  before(function(done) {
    //add pet objects into our database for our test to interact with
    var searchPet = new Pet();
    searchPet.name = 'fluffy, destroyer of worlds';
    searchPet.type = 'cat';
    searchPet.size = 'large';
    searchPet.gender = 'male';
    searchPet.color = 'pink';
    searchPet.save(function(err, doc) {
      if (err) throw err;
      done();
    });
  });
});