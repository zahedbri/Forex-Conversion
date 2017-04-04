'use strict';

var MoneyApp = angular.module('MoneyApp', ['ngRoute']);

MoneyApp.controller('MainController',
    function MainController($scope, $http) {

     /*   var onUserComplete = function (response) {
            $scope.money = response.data;
        };

        var onError = function (reson) {
            $scope.error = 'Could not fetch the data';
        };
*/
        $scope.base = 'USD';

        $scope.bases =
            [
                "USD",
                "EUR",
                "INR",
                "GBP"
            ];

        $scope.search  = function (base) {
            $http.get(`http://api.fixer.io/latest?base=${base}`)
                .then(function(res) {
                    $scope.money = res.data;
                    $scope.toType = $scope.rates.INR;
                    $scope.fromType = $scope.rates.USD;
                    $scope.fromValue = 1;
                    $scope.forExConvert();
                });
        };

        $scope.message = 'Forex Exchange Rate'

    });

MoneyApp.controller('HistoryController',
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

    })

.config(function($routeProvider) {
    $routeProvider
        .when('/history', {
            templateUrl: 'history.html',
            controller: 'HistoryController'
        });
});


