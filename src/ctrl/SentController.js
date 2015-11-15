mail_client.controller('SentController', function($scope, $http) {
            $http.get('/server/data/sent.json')
            .success(function (data, status, headers, config, statusText) {
                $scope.emails = data;
            }).error(function (data, status, headers, config, statusText) {
        })});