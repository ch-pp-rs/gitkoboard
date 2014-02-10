'use strict';

describe('Controller: RepoViewCtrl', function () {
    var repoViewCtrl, scope, controllerService, httpMock, routeParams;

    beforeEach(module('gitkoboardApp'));

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

        httpMock.expectGET(gitUrl).respond('test1');

        repoViewCtrl = controllerService('RepoViewCtrl', {
            $scope: scope
        });

        httpMock.flush();
        expect(scope.repo).toBe('test1');
    });
});
