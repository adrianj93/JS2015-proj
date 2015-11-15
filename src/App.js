var seconds = 2;

var mail_client = angular.module('mail_client', ['ui.router'])
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