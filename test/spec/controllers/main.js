'use strict';

describe('Controller: MainCtrl', function () {
    var scope, controllerService, httpMock;

    // load the controller's module
    beforeEach(module('gitkoboardApp'));

    var MainCtrl,
        scope;

    beforeEach(inject(function ($rootScope, $controller, $httpBackend) {
        scope = $rootScope.$new();
        controllerService = $controller;
        httpMock = $httpBackend;
    }));

    it('should get requested repo and add them to the scope', function () {
    });
});
