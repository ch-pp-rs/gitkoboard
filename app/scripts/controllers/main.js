'use strict';

angular.module('gitkoboardApp')
    .controller('MainCtrl', function ($scope, $http) {
        var userUrl, repoUrl, readmeUrl,
            gitUrl = 'https://api.github.com/',
            user = 'p-m-p',
            repo = 'jquery-box-slider';

        $scope.repos = new Array();

        userUrl = gitUrl + 'users/' + user + '/repos';
        repoUrl = gitUrl + 'repos/' + user + '/' + repo + '/languages';
        readmeUrl = gitUrl + 'repos/' + user + '/' + repo + '/readme';

        $http({method: 'GET', url: userUrl}).success(function (data) {
            $scope.repos = data;
        });

        $http({method: 'GET', url: repoUrl}).success(function (data) {
            $scope.jqueryRepo = data;
        });

        $http({method: 'GET', url: readmeUrl}).success(function (data) {
            $scope.readme = data;
        });

    }).directive('gbReadme', function () {
        return {
            restrict: 'E',
            scope: {
                customerInfo: '=info'
            },
            templateUrl: '/scripts/controllers/templates/readme.html'
        };
    });
