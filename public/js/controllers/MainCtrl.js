angular.module('csgSAW.controllers', []).controller('MainController',['$scope','$mdDialog','$mdMedia', function($scope,$mDialog,$mdMedia) {

	$scope.tagline = 'To the moon and back!';
	$scope.register = function(){
	    console-log('registering')
	}

}]);