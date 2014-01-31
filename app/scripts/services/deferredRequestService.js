'use strict';

angular.module('gitkoboardApp')
    .service('deferredRequestService', function deferredRequestService($rootScope, $http, $q) {
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
