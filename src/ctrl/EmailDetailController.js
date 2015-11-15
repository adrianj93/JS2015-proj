mail_client.controller('EmailDetailController', function($scope, $http, $stateParams) {
            $scope.mailId = $stateParams.mailId;
            var str1 = '/emails/';
            var str12 = '/sent/';
            var str2 = str1.concat($scope.mailId);
            var str22 = str12.concat($scope.mailId);
            $http.get(str2)
            .success(function (data, status, headers, config, statusText) {
                $scope.email = data;
            }).error(function (data, status, headers, config, statusText) {
                                    $http.get(str22)
                    .success(function (data1, status, headers, config, statusText) {
                        $scope.email = data1;
                    }).error(function (data, status, headers, config, statusText) {

                    })
            });
            
            $scope.mail = {};
            $scope.mail.read = true;
            
            var param = JSON.stringify($scope.mail);
            $http.put(str2, param)
            .success(function (data, status, headers, config, statusText) {
                $scope.email = data;
            }).error(function (data, status, headers, config, statusText) {})            
        });