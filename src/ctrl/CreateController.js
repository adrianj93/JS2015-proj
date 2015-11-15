mail_client.controller('CreateController', function($scope, $http, $stateParams) {    
            $scope.mail = {};
            $scope.mail.sent = Number(new Date());
            $scope.mail.id = $scope.mail.sent;
            $scope.mail.receivers = [];
            
            if ($stateParams.mailId != undefined) {
                var str1 = '/emails/';
                var str2 = str1.concat($stateParams.mailId);
                $http.get(str2)
                .success(function (data, status, headers, config, statusText) {
                    $scope.mail.title = "RE: " + data.title;
                    $scope.mail.receivers[0] = data.sender;
                    $scope.mail.content = "\n\n-------------------\nPoprzednia wiadomość:\n-------------------\n" + data.content;
                });
            }
            
            $scope.errorDiv = false;
            
            $scope.new_mail = function new_mail(id) {
                var str1 = '/sent';
                var param = JSON.stringify($scope.mail);
                
                $http.post(str1, param)
                .success(function (data, status, headers, config, statusText) {
                    console.log("Wysłano");
                }).error(function (data, status, headers, config, statusText) {
                    console.log("NIE Wysłano");
                    $scope.errorDiv = true;
                    })
            }
        });