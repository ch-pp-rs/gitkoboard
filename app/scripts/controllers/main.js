'use strict';

angular.module('gitkoboardApp')
    .controller('MainCtrl', function ($scope) {
        $scope.users = ['p-m-p', 'lukaszkorecki', 'ono', 'leocassarani', 'chapperz'];

        $scope.addUser = function (user) {
            $scope.users.push(user);
        };
    })
    .controller('RepoViewCtrl', function ($scope, $http, $routeParams) {
        var repoUrl,
            gitUrl = 'https://api.github.com/';

        $scope.guser = $routeParams.user;
        $scope.repoId = $routeParams.id;

        repoUrl = gitUrl + 'repos/' + $routeParams.user + '/' + $routeParams.id;

        $http({method: 'GET', url: repoUrl}).success(function (data) {
                $scope.repo = data;
            }
        );
    })
    .directive('gbRepoOverview', function (deferredRequest) {
        return {
            restrict: 'E',
            templateUrl: '/scripts/controllers/templates/repo-overview.html',
            link: function (scope) {
                var userUrl,
                    gitUrl = 'https://api.github.com/';

                userUrl = gitUrl + 'users/' + scope.user + '/repos';

                scope.repos = deferredRequest.getJSON(userUrl).then(function (data) {
                    scope.repos = data;
                });
            }
        };
    })
    .directive('gbLanguageStats', function (deferredRequest) {
        return {
            restrict: 'E',
            templateUrl: '/scripts/controllers/templates/language-stats.html',
            link: function (scope) {
                var gitUrl = 'https://api.github.com/',
                    url = gitUrl + 'repos/' + scope.guser + '/' + scope.repoId + '/languages',
                    languagesObj = {};

                languagesObj = deferredRequest.getJSON(url).then(function (data) {
                    languagesObj = data;

                    scope.languages = new Array();
                    scope.totalLinesCode = 0;

                    angular.forEach(languagesObj, function (lines, language) {
                        scope.totalLinesCode = scope.totalLinesCode + lines;
                        this.push({'language': language, 'lines': lines});
                    }, scope.languages);
                });
            }
        };
    })
    .service('deferredRequest', function ($rootScope, $http, $q) {
        this.getJSON = function (url) {

            var deferred = $q.defer();

            $http.get(url).
                success(function (data) {
                    deferred.resolve(data);
                }).
                error(function (data, status) {
                    deferred.reject(status + ' | bad');
                });

            return deferred.promise;
        };
    });
