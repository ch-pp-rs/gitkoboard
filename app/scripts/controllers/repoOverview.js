'use strict';

angular.module('gitkoboardApp')
    .controller('RepoOverviewCtrl', function ($scope) {
        $scope.users = ['p-m-p', 'lukaszkorecki', 'ono', 'leocassarani', 'chapperz'];

        $scope.addUser = function (user) {
            $scope.users.push(user);
        };
    });
