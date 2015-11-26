require(__dirname + '/../../app/js/client');
// mocks the backend for unit testing
require('angular-mocks');

describe('pets controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('vetApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    // get our pet controller
    var controller = new $ControllerConstructor('petsController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.pets)).toBe(true);
  });

});