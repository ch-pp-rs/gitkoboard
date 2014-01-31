'use strict';

describe('Controller: MainCtrl', function () {
    var mainCtrl, scope, controllerService;

    beforeEach(module('gitkoboardApp'));

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        controllerService = $controller;
    }));

    it('should add a user to the user array', function () {
        mainCtrl = controllerService('MainCtrl', {
            $scope: scope
        });
        var user = 'test1'

        expect(scope.users.length).toBe(5);

        scope.addUser(user);

        expect(scope.users.length).toBe(6);
    });
});
