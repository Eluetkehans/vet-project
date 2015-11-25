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
    var smallDog = new Pet();
    smallDog.name = 'fluffy, destroyer of worlds';
    smallDog.type = 'dog';
    smallDog.size = 'small';
    smallDog.gender = 'male';
    smallDog.color = 'pink';
    smallDog.save(function(err, doc) {
      if (err) throw err;
      done();
    });
  });

  before(function(done) {
    var mediumDog = new Pet();
    mediumDog.name = 'Pickles, the seathing mass';
    mediumDog.type = 'dog';
    mediumDog.size = 'medium';
    mediumDog.gender = 'male';
    mediumDog.color = 'orange';
    mediumDog.save(function(err, doc) {
      if (err) throw err;
      done();
    });
  });

  before(function(done) {
    var largeDog = new Pet();
    largeDog.name = 'Humphrey, keeper of secrets';
    largeDog.type = 'dog';
    largeDog.size = 'large';
    largeDog.gender = 'male';
    largeDog.color = 'tan';
    largeDog.save(function(err, doc) {
      if (err) throw err;
      done();
    });
  });

  // add one cat to check we are not accidentaly including cats
  before(function(done) {
    var cat = new Pet();
    cat.name = 'Fido, the deciever';
    cat.type = 'cat';
    cat.size = 'large';
    cat.gender = 'male';
    cat.color = 'tan';
    cat.save(function(err, doc) {
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

// We could chain all the size tests in one test, but it would create a
// pyramid of doom situation. We will do them seperately to keep the code
// cleaner.
  it('should return a list of small dogs', function(done) {
    chai.request(url)
      .get('/dogs/small')
      .end(function(err, res) {
        if(err) throw err;
        expect(res.body.dogs[0].name).to.eql('fluffy, destroyer of worlds');
        done();
      });
  });

  it('should return a list of medium dogs', function(done) {
    chai.request(url)
      .get('/dogs/medium')
      .end(function(err, res) {
        if(err) throw err;
        expect(res.body.dogs[0].name).to.eql('Pickles, the seathing mass');
        done();
      });
  });

  it('should return a list of large dogs and no cats', function(done) {
    chai.request(url)
      .get('/dogs/large')
      .end(function(err, res) {
        if(err) throw err;
        expect(res.body.dogs[0].name).to.eql('Humphrey, keeper of secrets');
        // and check the dog wasn't included
        expect(res.body.dogs.length).to.eql(1);
        done();
      });
  });

});