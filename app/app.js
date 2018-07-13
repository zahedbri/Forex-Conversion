var MoneyApp = angular.module('MoneyApp', ['ngRoute']);

MoneyApp.controller('historyController',
    function MainController($scope, $http, $filter) {
        $scope.bases = ["USD", "EUR", "INR", "GBP"];

        const TodayDate = $filter('date')(new Date(), "yyyy-MM-dd");

        $http.get(`https://data.fixer.io/api/${TodayDate}?base=USD?access_key=4931be0b39c382bbaec9e0b8fd46ef59`)
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
            $http.get(`https://data.fixer.io/api/${formattedDate}?base=${base}?access_key=4931be0b39c382bbaec9e0b8fd46ef59`)
                .then(function (res) {
                    $scope.money = res.data;
                });
        };
    });

MoneyApp.controller('rateController',
    function MainController($scope, $http) {
        $scope.bases = ["USD", "EUR", "INR", "GBP"];

        $http.get(`https://data.fixer.io/api/latest?base=USD?access_key=4931be0b39c382bbaec9e0b8fd46ef59`)
            .then(function (res) {
                $scope.money = res.data;
            });
        $scope.search = function (base) {
            $http.get(`https://data.fixer.io/api/latest?base=${base}?access_key=4931be0b39c382bbaec9e0b8fd46ef59`)
                .then(function (res) {
                    $scope.money = res.data;
                });
        };
    });


MoneyApp.controller('ConvertCtrl',
    function MainController($scope, $http) {
        var base = this;
        $scope.rates = {};
        $http.get('https://data.fixer.io/api/latest?base=ZAR?access_key=4931be0b39c382bbaec9e0b8fd46ef59')
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
