/**
 * Created by Gaurav MphRx on 3/21/2017.
 */
angular.module('store.controller', ['dataStore'])
    .controller("StoreCtrl", ['$scope', '$routeParams', 'DataService', function ($scope, $routeParams, DataService) {

        // get store and cart from service
        $scope.store = DataService.store;
        $scope.cart = DataService.cart;

        // use routing to pick the selected product
        if ($routeParams.productSku != null) {
            $scope.product = $scope.store.getProduct($routeParams.productSku);
        }
    }])