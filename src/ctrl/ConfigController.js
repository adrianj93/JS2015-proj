mail_client.controller('ConfigController', function($scope, $http, $stateParams) {
            $scope.errorDiv = false;
            
            $scope.getSeconds = function getSeconds() {
                return seconds;
            };
            
            $scope.setSeconds = function setSeconds(seconds_new) {
                if (seconds_new == null) {
                    $scope.errorDiv = true;
                } else {
                    seconds = seconds_new;
                    $scope.errorDiv = false;
                }          
            }
        });