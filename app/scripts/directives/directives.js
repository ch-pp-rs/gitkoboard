'use strict';

angular.module('gitkoboardApp')
    .directive('gbRepoOverview', function (deferredRequestService) {
        return {
            restrict: 'E',
            templateUrl: '/scripts/directives/templates/repo-overview.html',
            link: function (scope) {
                var userUrl,
                    gitUrl = 'https://api.github.com/';

                userUrl = gitUrl + 'users/' + scope.user + '/repos';

                scope.repos = deferredRequestService.getJSON(userUrl).then(function (data) {
                    scope.repos = data;
                });
            }
        };
    })
    .directive('gbLanguageStats', function (deferredRequestService) {
        return {
            restrict: 'E',
            templateUrl: '/scripts/directives/templates/language-stats.html',
            link: function (scope) {
                var gitUrl = 'https://api.github.com/',
                    url = gitUrl + 'repos/' + scope.guser + '/' + scope.repoId + '/languages',
                    languagesObj = {};

                languagesObj = deferredRequestService.getJSON(url).then(function (data) {
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
    });
