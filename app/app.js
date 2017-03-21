'use strict';

// Declare app level module which depends on views, and components

angular.module('xebiaStore', ['ngRoute','dataStore','store.controller'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/store', {
            templateUrl: 'store/store.html',
            controller: 'StoreCtrl'
        }).when('/cart', {
            templateUrl: 'cart/cart.html',
            controller: 'StoreCtrl'
        }).otherwise({
            redirectTo: '/store'
        });
    }]);

