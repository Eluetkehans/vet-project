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

  describe('REST requests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('petsController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get requests when getAll() is called.', function() {
      $httpBackend.expectGET('/api/pets').respond(200, {pets: [{name: 'fluffy'}]});
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.pets[0].name).toBe('fluffy');
    });

    it('should be able to send a pet to be added to db', function() {
      $httpBackend.expectPOST('/api/pets').respond(200, {msg: 'success'});
      $scope.addPet({name: 'fluffy'});
      $httpBackend.flush();
      expect($scope.pets[0].name).toBe('fluffy');
    });

    it('should be able to get specific pet', function() {
      $httpBackend.expectGET('/api/pets/1').respond(200, {pets: [{name: 'fluffy'}]});
      $scope.findOnePet(1);
      $httpBackend.flush();
      expect($scope.pets[0].name).toBe('fluffy');
    });

    it('should be able to delete a specific pet', function() {
      $scope.pets = [{name: 'fluffy', _id: 1}];
      $httpBackend.expectDELETE('/api/pets/1').respond(200, {msg: 'success'});
      $scope.removePet(1);
      $httpBackend.flush();
      expect($scope.pets.length).toBe(0);
    });

    it('should be able to update a specific pet', function() {
      $scope.pets = [{name: 'fluffy', _id: 1}];
      $httpBackend.expectPUT('/api/pets/1').respond(200, {msg: 'success'});
      $scope.updatePet({name: 'noodles', _id: 1});
      $httpBackend.flush();
      expect($scope.pets[0].name).toBe('noodles');
    });

  });
});