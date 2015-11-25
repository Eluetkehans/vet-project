module.exports = function(app) {
  // create our controller and use it. Dependencies are put in the array
  // to protect them from minification or uglification.
  app.controller('PetsController', ['$scope', '$http', function($scope, $http) {

    $scope.pets = [];
    $scope.headings = [];
    $scope.rows = [];

    // Get a full list of pets from our db
    $scope.getAll = function() {
      $http.get('/api/pets')
        .then(function(res) {
          // Success case: put search data into $scope.pets
          $scope.pets = res.body.pets;
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