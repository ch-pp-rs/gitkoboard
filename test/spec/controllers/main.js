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

    it('should get users repos and add them to the scope', function () {
        var gitUrl = 'https://api.github.com/',
            user = 'p-m-p',
            repo = 'jquery-box-slider';

        httpMock.expectGET(gitUrl + 'users/' + user + '/repos').respond('1');
        httpMock.expectGET(gitUrl + 'repos/' + user + '/' + repo + '/languages').respond('2');
        httpMock.expectGET(gitUrl + 'repos/' + user + '/' + repo + '/readme').respond('3');

        MainCtrl = controllerService('MainCtrl', {
            $scope: scope
        });

        httpMock.flush();
        expect(scope.repos).toBe('1');
        expect(scope.jqueryRepo).toBe('2');
        expect(scope.readme).toBe('3');
    });
});
