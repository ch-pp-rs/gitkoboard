'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('gitkoboardApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should get users repos and add them to the scope', function () {
    expect(scope.repos.length).toBe(3);
  });
});
