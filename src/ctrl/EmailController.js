mail_client.controller('EmailController', function($scope, $http, $interval, $state) {  
            $scope.getEmails = function() {
                $http.get('/server/data/emails.json')
            .success(function (data, status, headers, config, statusText) {
                $scope.emails = data;
            }).error(function (data, status, headers, config, statusText) {
                })
            };
            
            $scope.getEmails();
            
            $scope.intervalPromise = $interval(function(){     
                $scope.getEmails();
            }, seconds*1000*60);
            
            $scope.delete_mail = function delete_mail(id, location) {
                //var str1 = '/emails/';
                var str2 = location.concat(id);
                
                $http.delete(str2)
                .success(function (data, status, headers, config, statusText) {
                    console.log("Usunięto");
                }).error(function (data, status, headers, config, statusText) {
                    console.log("NIE Usunięto");
                    })
            }      
        });