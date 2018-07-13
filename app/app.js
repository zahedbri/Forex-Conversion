var MoneyApp = angular.module('MoneyApp', ['ngRoute']);

MoneyApp.controller('historyController',
    function MainController($scope, $http, $filter) {
        $scope.bases = ["USD", "EUR", "INR", "GBP"];

        const TodayDate = $filter('date')(new Date(), "yyyy-MM-dd");

        $http.get(`https://forex-api-self.herokuapp.com/api/${TodayDate}`)
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
            $http.get(`https://forex-api-self.herokuapp.com/api/${formattedDate}`)
                .then(function (res) {
                    $scope.money = res.data;
                });
        };
    });

MoneyApp.controller('rateController',
    function MainController($scope, $http) {
        $scope.bases = ["USD", "EUR", "INR", "GBP"];

        $http.get(`https://forex-api-self.herokuapp.com/api/latest?base=USD`)
            .then(function (res) {
                $scope.money = res.data;
            });
        $scope.search = function (base) {
            $http.get(`https://forex-api-self.herokuapp.com/api/latest?base=${base}`)
                .then(function (res) {
                    $scope.money = res.data;
                });
        };
    });


MoneyApp.controller('ConvertCtrl',
    function MainController($scope, $http) {
        var base = this;
        $scope.rates = {};
        $http.get('https://forex-api-self.herokuapp.com/api/latest?base=ZAR')
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

    $locationProvider.html5Mode(true);
});
