var MoneyApp = angular.module('MoneyApp', ['ngRoute']);

MoneyApp.controller('historyController',
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

        $scope.search = function (date, base) {
            if (base == undefined) {
                base = 'USD';
            }
            if (date == undefined) {
                date = TodayDate;
            }
            const formattedDate = $filter('date')(date, "yyyy-MM-dd");
            $http.get(`http://api.fixer.io/${formattedDate}?base=${base}`)
                .then(onUserComplete, onError);
        };
    });

MoneyApp.controller('rateController',
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
        $scope.search = function (base) {
            $http.get(`http://api.fixer.io/latest?base=${base}`)
                .then(onUserComplete, onError);
        };
    });


MoneyApp.controller('ConvertCtrl',
    function MainController($scope, $http) {
        var base = this;
        $scope.rates = {};
        $http.get('http://api.fixer.io/latest?base=ZAR')
            .then(function (res) {
                $scope.rates = res.data.rates;
                $scope.fromType = $scope.rates.USD;
                $scope.toType = $scope.rates.INR;
                $scope.fromValue = 1;
                $scope.forExConvert();
            });
        $scope.forExConvert = function () {
            $scope.toValue = $scope.fromValue * ($scope.toType * (1 / $scope.fromType));
        };
    });


MoneyApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'ConvertCtrl'
        })

        .when('/rates', {
            templateUrl: 'pages/Rates.html',
            controller: 'rateController'
        })

        .when('/history', {
            templateUrl: 'pages/history.html',
            controller: 'historyController'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});
