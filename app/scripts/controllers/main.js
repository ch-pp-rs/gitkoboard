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
    });
