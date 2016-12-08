angular.module('csgSAW.controllers', ['ngMaterial']).controller('MainController',['$scope','$mdDialog','$mdMedia','UserService', function($scope,$mDialog,$mdMedia,Users) {

	$scope.tagline = 'To the moon and back!';
	$scope.register = function(){
	    console-log('registering')
	}

}]);