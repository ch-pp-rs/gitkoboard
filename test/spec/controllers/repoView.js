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

        httpMock.expectGET(gitUrl + '/languages').respond('2');
        httpMock.expectGET(gitUrl + '/readme').respond('3');

        RepoViewCtrl = controllerService('RepoViewCtrl', {
            $scope: scope
        });

        httpMock.flush();
        expect(scope.jqueryRepo).toBe('2');
        expect(scope.readme).toBe('3');
        expect(false).toBe(true);
    });
});
