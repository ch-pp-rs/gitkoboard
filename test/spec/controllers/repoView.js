'use strict';

describe('Controller: RepoViewCtrl', function () {
    var scope, controllerService, httpMock, routeParams;

    // load the controller's module
    beforeEach(module('gitkoboardApp'));

    var RepoViewCtrl,
        scope;

    beforeEach(inject(function ($rootScope, $controller, $httpBackend, $routeParams) {
        scope = $rootScope.$new();
        controllerService = $controller;
        httpMock = $httpBackend;
        routeParams = $routeParams
    }));

    it('should get requested repo and add them to the scope', function () {
        var gitUrl = 'https://api.github.com/';
        routeParams.user = 'p-m-p';
        routeParams.id = 'jquery-box-slider';

        gitUrl = gitUrl + 'repos/' + routeParams.user + '/' + routeParams.id;

        httpMock.expectGET(gitUrl).respond('2');

        RepoViewCtrl = controllerService('RepoViewCtrl', {
            $scope: scope
        });

        httpMock.flush();
        expect(scope.repo).toBe('2');
    });
});
