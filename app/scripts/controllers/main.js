'use strict';

angular.module('gitkoboardApp')
    .controller('MainCtrl', function ($scope, $http) {
        var url,
            gitUrl = 'https://api.github.com/',
            user = 'p-m-p',
            repo = 'jquery-box-slider';

        $scope.repos = new Array();

        url = gitUrl + 'users/' + user + '/repos';

        $http({method: 'GET', url: url}).success(function (data) {
            $scope.repos = data;
        });

        url = gitUrl + 'repos/' + user + '/' + repo + '/languages';

        $http({method: 'GET', url: url}).success(function (data) {
            $scope.jqueryRepo = data;
        });

        url = gitUrl + 'repos/' + user + '/' + repo + '/readme';

        $http({method: 'GET', url: url}).success(function (data) {
            $scope.readme = data;
        });

    });
