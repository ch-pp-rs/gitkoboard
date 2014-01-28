

function FeedCtrl($scope, $http) {
    var url,
        gitUrl = 'https://api.github.com/';
        user = 'p-m-p',
        repo = 'jquery-box-slider';

    $scope.repos = new Array();

    url = gitUrl + 'users/' + user + '/repos';
    $http({method: 'GET', url: url}).
        success(function(data, status, headers, config) {
            $scope.repos = data;
        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

    url = gitUrl + 'repos/' + user + '/' + repo + '/languages';
    $http({method: 'GET', url: url}).
        success(function(data, status, headers, config) {
            $scope.jqueryRepo = data;
        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

    url = gitUrl + 'repos/' + user + '/' + repo + '/readme';
    $http({method: 'GET', url: url}).
        success(function(data, status, headers, config) {
            $scope.readme = data;
        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
}