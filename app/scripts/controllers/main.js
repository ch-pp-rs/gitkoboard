'use strict';

angular.module('gitkoboardApp')
    .controller('MainCtrl', function ($scope) {
        $scope.users = ['p-m-p', 'lukaszkorecki', 'ono', 'leocassarani', 'isaacs', 'kripken', 'chapperz'];

        $scope.addUser = function () {
            $scope.users.push($scope.user);
        };
    })
    .controller('RepoViewCtrl', function ($scope, $http, $routeParams) {
        var repoUrl, readmeUrl,
            gitUrl = 'https://api.github.com/';

        $scope.guser = $routeParams.user;
        $scope.repoId = $routeParams.id;

        repoUrl = gitUrl + 'repos/' + $routeParams.user + '/' + $routeParams.id;
        readmeUrl = gitUrl + 'repos/' + $routeParams.user + '/' + $routeParams.id + '/readme';

        $http({method: 'GET', url: repoUrl}).success(function (data) {
                $scope.repo = data;
            }
        );

        $http({method: 'GET', url: readmeUrl}).success(function (data) {
                $scope.readme = data;
            }
        );
    })

    .directive('gbReadme', function () {
        return {
            restrict: 'E',
            templateUrl: '/scripts/controllers/templates/readme.html'
        };
    })
    .directive('gbRepoOverview', function (testService) {
        return {
            restrict: 'E',
            templateUrl: '/scripts/controllers/templates/repo-overview.html',
            link: function (scope) {
                var userUrl,
                    gitUrl = 'https://api.github.com/';

                userUrl = gitUrl + 'users/' + scope.user + '/repos';

                scope.repos = testService.getJSON(userUrl).then(function (data) {
                    scope.repos = data;
                });
            }
        };
    })
    .directive('gbLanguageStats', function (testService) {
        return {
            restrict: 'E',
            templateUrl: '/scripts/controllers/templates/language-stats.html',
            link: function (scope) {
                var gitUrl = 'https://api.github.com/',
                    url = gitUrl + 'repos/' + scope.guser + '/' + scope.repoId + '/languages',
                    languagesObj = {};

                languagesObj = testService.getJSON(url).then(function (data) {
                    languagesObj = data;

                    scope.languages = new Array();
                    scope.totalLinesCode = 0;

                    angular.forEach(languagesObj, function(lines, language){
                        scope.totalLinesCode = scope.totalLinesCode + lines;
                        this.push({'language': language, 'lines': lines});
                    }, scope.languages);
                });
            }
        };
    })
    .service('testService', function ($rootScope, $http, $q) {
        this.getJSON = function (url) {

            // Setup a defered
            var deferred = $q.defer();

            $http.get(url).
                success(function (data) {
                    // Resolve the promise with the data
                    deferred.resolve(data);
                }).
                error(function (data, status) {
                    // Something bad happened
                    deferred.reject(status + ' | bad');
                });

            // Return a promise that they will eventually get something back
            return deferred.promise;
        };
    });
