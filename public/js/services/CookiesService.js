angular.module('CsgSAW.services').factory('cookiesService', ['ngCookies', function ($scope,
    $Cookies) {
    $scope.$storage = $localStorage;
    console.log('cookiesService')
    return $localStorage;
}])
