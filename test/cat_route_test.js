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
var url = 'localhost:3000/api';

// require in our server so it auto-runs when this test is run.
require(__dirname + '/../server');

describe('Cat Api', function() {

// Add pets to database to search for
  before(function(done) {
    var smallCat = new Pet();
    smallCat.name = 'fluffy, destroyer of worlds';
    smallCat.type = 'cat';
    smallCat.size = 'small';
    smallCat.gender = 'male';
    smallCat.color = 'pink';
    smallCat.save(function(err, doc) {
      if (err) throw err;
      done();
    });
  });

  before(function(done) {
    var mediumCat = new Pet();
    mediumCat.name = 'Pickles, the seathing mass';
    mediumCat.type = 'cat';
    mediumCat.size = 'medium';
    mediumCat.gender = 'male';
    mediumCat.color = 'orange';
    mediumCat.save(function(err, doc) {
      if (err) throw err;
      done();
    });
  });

  before(function(done) {
    var largeCat = new Pet();
    largeCat.name = 'Humphrey, keeper of secrets';
    largeCat.type = 'cat';
    largeCat.size = 'large';
    largeCat.gender = 'male';
    largeCat.color = 'tan';
    largeCat.save(function(err, doc) {
      if (err) throw err;
      done();
    });
  });

  // add one dog to check we are not accidentaly including dogs
  before(function(done) {
    var dog = new Pet();
    dog.name = 'Fido, the deciever';
    dog.type = 'dog';
    dog.size = 'large';
    dog.gender = 'male';
    dog.color = 'tan';
    dog.save(function(err, doc) {
      if (err) throw err;
      done();
    });
  });

  after(function(done) {
    // drop database after test to make sure we start from a clean slate
    // every time we test
    mongoose.connection.db.dropDatabase(function(err) {
      if(err) throw err;
      done();
    });
  });
  
});