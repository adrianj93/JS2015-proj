var seconds = 2;

var mail_client = angular.module('mail_client', ['ui.router'])
        .controller('EmailController', function($scope, $http, $interval, $state) {
              
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
        })
        .controller('SentController', function($scope, $http) {
            $http.get('/server/data/sent.json')
            .success(function (data, status, headers, config, statusText) {
                $scope.emails = data;
            }).error(function (data, status, headers, config, statusText) {
        })})
        .controller('EmailDetailController', function($scope, $http, $stateParams) {
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
        })
        .controller('CreateController', function($scope, $http, $stateParams) {
            $scope.mail = {};
            $scope.mail.sent = Number(new Date());
            $scope.mail.id = $scope.mail.sent;
            $scope.mail.receivers = [];
            
            $scope.errorDiv = false;
            $scope.wzorMaili = /^\S+@\S+\.\S+$/;
            
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
        })
        .controller('ConfigController', function($scope, $http, $stateParams) {
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
        })
        .filter('cut', function () {
            return function (value, wordwise, max, tail) {
                if (!value) return '';

                max = parseInt(max, 10);
                if (!max) return value;
                if (value.length <= max) return value;

                value = value.substr(0, max);
                if (wordwise) {
                    var lastspace = value.lastIndexOf(' ');
                    if (lastspace != -1) {
                        value = value.substr(0, lastspace);
                    }
                }

                return value + (tail || '…');
            };
        })
        .filter('reverse', function() {
          return function(items) {
            if (!items || !items.length) { return; }
              return items.slice().reverse();
          };
        })
        .config(function($stateProvider) {
            $stateProvider
            .state('inbox', {
                url: "/inbox",
                controller: 'EmailController',
                templateUrl: "pages/home.html"
            })
            .state('sent', {
                url: "/sent",
                controller: 'SentController',
                templateUrl: "pages/sent.html"
            })
            .state('view', {
                url: "/view/:mailId",
                controller: 'EmailDetailController',
                templateUrl: "pages/detail.html"
            })   
            .state('mail', {
                url: "/mail/:mailId",
                controller: 'EmailDetailController',
                templateUrl: "pages/detail.html"
            })             
            .state('create', {
                url: "/create",
                controller: 'CreateController',
                templateUrl: "pages/new.html"
            })   
            .state('config', {
                url: "/config",
                controller: 'ConfigController',
                templateUrl: "pages/config.html"
            })
        });