module.exports = function(app) {
  // create our controller and use it. Dependencies are put in the array
  // to protect them from minification or uglification.
  app.controller('petsController', ['$scope', '$http', function($scope, $http) {

    $scope.pets = [];
    $scope.headings = [];
    $scope.rows = [];

    // Get a full list of pets from our db
    $scope.getAll = function() {
      $http.get('/api/pets')
        .then(function(res) {
          // Success case: put search data into $scope.pets
          $scope.pets = res.data.pets;
          // Prep the table
          $scope.tableInit();
        }, function(res) {
          // Failure case: console out the res so we can see what went wrong.
          console.log(res);
        });
    };

    // Get one pet
    $scope.findOnePet = function(id) {
      $http.get('/api/pets/' + id)
        .then(function(res) {
          // replace our list of pets with our one result
          $scope.pets = res.data.pets;
        }, function(res) {
          // Failure case: console out the res so we can see what went wrong.
          console.log(res);
        });
    };

    // Add a pet to db
    $scope.addPet = function(pet) {
      $http.post('/api/pets', {createPet: pet})
        .then(function(res) {
          // Success case: and new pet to pets list
          $scope.pets.push(pet);
        
        }, function(res) {
          // Failure case: console out the res so we can see what went wrong.
          console.log(res);
        });
    };

    $scope.removePet = function(id) {
      $http.delete('/api/pets/' + id)
        .then(function(res) {
          // Success case: remove pet from the pet list
          $scope.pets.forEach(function(pet, index) {
            // find the pet with the right id, then splice it out at its index.
            if(pet._id === id) $scope.pets.splice(index, 1);
          });
        
        }, function(res) {
          // Failure case: console out the res so we can see what went wrong.
          console.log(res);
        });
    };

    $scope.updatePet = function(pet) {
      $http.put('/api/pets/' + pet._id, pet)
        .then(function(res) {
          // Success case: replace pet from the pet list at its index
          $scope.pets.forEach(function(oldPet, index) {
            // find the pet with the right id, then splice it out at its index.
            if(oldPet._id === pet._id) $scope.pets[index] = pet;
          });
        
        }, function(res) {
          // Failure case: console out the res so we can see what went wrong.
          console.log(res);
        });
    };

    // Fills the table rows and headings based of of what is in pets
    $scope.tableInit = function() {
      // Finds the fields of our tables dynamicly in case we decide to
      // change the schema in the future.
      var keyArray = Object.keys($scope.pets[0]);
      var rows = [];
      // checks the value of every heading for each pet object and makes
      // a row for our table from it
      for(var i = 0; i < $scope.pets.length; i++) {
          var valueArray = [];
          for(var j = 0; j < keyArray.length; j++) {
              valueArray[j] = $scope.pets[i][keyArray[j]];
          }
          rows.push(valueArray);
      }
      // Every key is obviously going to be a heading
      $scope.headings = keyArray;
      $scope.rows = rows;
    };

    // sorts the table based on what colomn heading it is passed
    $scope.tableSort = function(col) {
        var oldArray = $scope.rows;
        $scope.rows = oldArray.sort(function(a, b) {
            var x = a[$scope.headings.indexOf(col)];
            var y = b[$scope.headings.indexOf(col)];
          if (x < y) return -1;
            if (x > y) return 1;
            return 0;
        });
    };

  }]);
};