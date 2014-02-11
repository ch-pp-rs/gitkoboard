'use strict';

function callGit (requestUrl, deferredRequestService) {
    return deferredRequestService.getJSON(requestUrl).then(function (data) {
        return data;
    });
}

function callGitUser (user, deferredRequestService) {
    var userUrl,
        gitUrl = 'https://api.github.com/';

    userUrl = gitUrl + 'users/' + user;

    return callGit(userUrl, deferredRequestService);
}

function callGitRepo (user, deferredRequestService) {
    var repoUrl,
        gitUrl = 'https://api.github.com/';

    repoUrl = gitUrl + 'users/' + user + '/repos';

    return callGit(repoUrl, deferredRequestService);
}

angular.module('gitkoboardApp')
    .directive('gbRepoOverview', function (deferredRequestService) {
        return {
            restrict: 'E',
            templateUrl: '/scripts/directives/templates/repo-overview.html',
            link: function (scope) {
                scope.repos = callGitRepo(scope.user, deferredRequestService);
                scope.gitUsers = callGitUser(scope.user, deferredRequestService);
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
