function FeedCtrl($scope, $http) {
    var url = 'https://api.github.com/orgs/chapperz/repos';
    var url2 = 'https://api.github.com/users/:chapperz';

    $http({method: 'GET', url: url}).
        success(function(data, status, headers, config) {
            $scope.data = data;
        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

}