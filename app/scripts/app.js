'use strict';

angular.module('gitkoboardApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/repo/:user/:id', {
        templateUrl: 'views/repo-details.html',
        controller: 'RepoViewCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
