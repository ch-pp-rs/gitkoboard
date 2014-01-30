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

        repoUrl = gitUrl + 'repos/' + $routeParams.user + '/' + $routeParams.id + '/languages';
        readmeUrl = gitUrl + 'repos/' + $routeParams.user + '/' + $routeParams.id + '/readme';

        $http({method: 'GET', url: repoUrl}).success(function (data) {
                $scope.jqueryRepo = data;
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
            scope: {
                customerInfo: '=info'
            },
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
