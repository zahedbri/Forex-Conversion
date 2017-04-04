// create the module and name it scotchApp
var MoneyApp = angular.module('MoneyApp', ['ngRoute']);

// configure our routes

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

        $scope.message = 'Forex Exchange Rate'

    });


MoneyApp.controller('contactController',
    function MainController($scope, $http, $filter) {

        var onUserComplete = function (response) {
            $scope.money = response.data;
        };

        var onError = function (reson) {
            $scope.error = 'Could not fetch the data';
        };


        $scope.search  = function (date) {
            var formattedDate =   $filter('date')(date, "yyyy-MM-dd");
            $http.get(`http://api.fixer.io/${formattedDate}?base=USD`)
                .then(onUserComplete, onError);
        };

        $scope.base = 'EUR';

        $scope.message = 'Forex Exchange Rate'

    });


MoneyApp.controller('ConvertCtrl', ['$scope', '$http', function($scope, $http) {
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
            $scope.toValuem = $scope.fromValue * ($scope.toType * (1 / $scope.fromType));
            $scope.toValue = $scope.toValuem;
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
