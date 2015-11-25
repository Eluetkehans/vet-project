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
  // in searches. Same with delete and update.

  var searchId;
  var deleteId;
  var updateId;

//add pet objects into our database for our test to interact with
  before(function(done) {
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

  before(function(done) {
    var deletePet = new Pet();
    deletePet.name = 'Pickles, the seathing mass';
    deletePet.type = 'cat';
    deletePet.size = 'medium';
    deletePet.gender = 'male';
    deletePet.color = 'orange';
    deletePet.save(function(err, doc) {
      if (err) throw err;
      // set what id to search for before the tests are run.
      deleteId = doc._id;
      done();
    });
  });

  before(function(done) {
    var updatePet = new Pet();
    updatePet.name = 'Humphrey, keeper of secrets';
    updatePet.type = 'dog';
    updatePet.size = 'small';
    updatePet.gender = 'male';
    updatePet.color = 'tan';
    updatePet.save(function(err, doc) {
      if (err) throw err;
      // set what id to search for before the tests are run.
      updateId = doc._id;
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
        // We just want to check that it is not empty.
        expect(res.body.pets[0]).to.not.eql(undefined);
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

  it('should delete a pet by id', function(done) {
    chai.request(url)
      .delete('/pets/' + deleteId)
      .end(function(err, res) {
        expect(err).to.eql(null);
        // We want find() to give us an empty array, because the pet with
        // deleteId should no longer exist.
        Pet.find({_id: deleteId}, function(err, docs) {
          if(err) throw err;
          expect(docs.length).to.eql(0);
          done();
        });
      });
  });

  it('should update a pet by id', function(done) {
    var updateData = {
                      "updateData": {
                                      "color": "black",
                                      "size": "medium"
                                    }

                     };
    chai.request(url)
      .put('/pets/' + updateId)
      .send(updateData)
      .end(function(err, res) {
        Pet.findOne({_id: updateId}, function(err, doc) {
          expect(err).to.eql(null);
          expect(doc.color).to.eql("black");
          expect(doc.size).to.eql("medium");
          done();
        });
      });
  });
});