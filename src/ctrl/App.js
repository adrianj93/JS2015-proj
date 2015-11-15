var seconds = 2;

var mail_client = angular.module('mail_client', ['ui.router'])
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
            .state('index', {
                url: "",
                controller: 'EmailController',
                templateUrl: "pages/home.html"
            })       
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
            .state('create', {
                url: "/create",
                controller: 'CreateController',
                templateUrl: "pages/new.html"
            })   
            .state('create_respond', {
                url: "/create/:mailId",
                controller: 'CreateController',
                templateUrl: "pages/new.html"
            })   
            .state('config', {
                url: "/config",
                controller: 'ConfigController',
                templateUrl: "pages/config.html"
            })
        });