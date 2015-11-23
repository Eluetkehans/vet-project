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

describe('Pet routes', function() {
  // Because we make a new Pet to search every time we run a test session
  // we need a spot to save the semi-randomly generated _id to use later
  // in searches.

  var searchId;

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
      // set what id to search for before the tests are run.
      searchId = doc._id;
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

  it('should get a list of pets on get request', function(done) {
    chai.request(url)
      .get('/pets')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.pets[0].name).to.eql('fluffy, destroyer of worlds');
        done();
      });
  });
  it('should be able to add a new pet into the db', function(done) {
    var createPet = {
                     "createPet": {
                                   "name": "Mittens, the despoiler",
                                   "type": "dog",
                                   "size": "small",
                                   "gender": "female",
                                   "color": "sable"
                                  }
                    };
    chai.request(url)
      .post('/pets')
      .send(createPet)
      .end(function(err, res) {
        expect(err).to.eql(null);
        // find first result. Returns single doc, not array of docs.
        Pet.findOne({"name": "Mittens, the despoiler"}, function(err, doc) {
          if(err) throw err;
          expect(doc.name).to.eql("Mittens, the despoiler");
          done();
        });
      });
  });

  it('should be able to search for a pet by id', function(done) {
    chai.request(url)
      .get('/pets/' + searchId)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.pets[0].name).to.eql('fluffy, destroyer of worlds');
        done();
      });
  });

});