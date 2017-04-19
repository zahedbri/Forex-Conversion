// create the module and name it scotchApp


var MoneyApp = angular.module('MoneyApp', ['ngRoute']);

// configure our routes
/*
MoneyApp.controller('aboutController',
    function MainController($scope, $http) {

        var onUserComplete = function (response) {
         $scope.money = response.data;
         };

        var onError = function (reson) {
         $scope.error = 'Could not fetch the data';
         };

        // $scope.base = 'USD';

        $scope.bases =
            [
                "USD",
                "EUR",
                "INR",
                "GBP"
            ];

        $scope.search  = function (base) {
            $http.get(`http://api.fixer.io/latest?base=${base}`)
                .then(onUserComplete, onError);
        };
    });*/


MoneyApp.controller('contactController',
    function MainController($scope, $http, $filter) {

        var onUserComplete = function (response) {
            $scope.money = response.data;
        };

        var onError = function (reson) {
            $scope.error = 'Could not fetch the data';
        };

        $scope.bases =
            [
                "USD",
                "EUR",
                "INR",
                "GBP"
            ];

        const TodayDate = $filter('date')(new Date(), "yyyy-MM-dd");

        $http.get(`http://api.fixer.io/${TodayDate}?base=USD`)
            .then(function (res) {
                $scope.money = res.data;
            });

        $scope.search  = function (date, base) {
            if(base == undefined) {
                base = 'USD';
            }
            if(date == undefined) {
                date =  TodayDate;
            }
            const formattedDate =   $filter('date')(date, "yyyy-MM-dd");
            $http.get(`http://api.fixer.io/${formattedDate}?base=${base}`)
                .then(onUserComplete, onError);
        };
    });



MoneyApp.controller('aboutController',
    function MainController($scope, $http) {

        var onUserComplete = function (response) {
            $scope.money = response.data;
        };

        var onError = function (reson) {
            $scope.error = 'Could not fetch the data';
        };

        $scope.bases =
            [
                "USD",
                "EUR",
                "INR",
                "GBP"
            ];

        $http.get(`http://api.fixer.io/latest?base=USD`)
            .then(function (res) {
                $scope.money = res.data;
            });
        $scope.search  = function (base) {
            $http.get(`http://api.fixer.io/latest?base=${base}`)
                .then(onUserComplete, onError);
        };
    });


MoneyApp.controller('ConvertCtrl', ['$scope', '$http', function($scope, $http) {
        var base = this;
        $scope.rates = {};
        $http.get('http://api.fixer.io/latest?base=ZAR')
            .then(function(res) {
                $scope.rates = res.data.rates;
                $scope.toType = $scope.rates.INR;
                $scope.fromType = $scope.rates.USD;
                $scope.fromValue = 1;
                $scope.forExConvert();
            });
        $scope.forExConvert = function() {
            $scope.toValue = $scope.fromValue * ($scope.toType * (1 / $scope.fromType));
        };
    }]);



MoneyApp.config(function($routeProvider) {
    $routeProvider

    // route for the home page
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'ConvertCtrl'
        })

        // route for the about page
        .when('/about', {
            templateUrl : 'pages/about.html',
            controller  : 'aboutController'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl : 'pages/contact.html',
            controller  : 'contactController'
        });
});
