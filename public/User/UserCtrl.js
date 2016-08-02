'use strict';
angular.module('csgSAW.controllers').controller('UserController',['$scope','UserService',function($scope,Users){
     var self = this;
     $scope.title =' Registrazione utente'
        self.cancel = function($event) {
              $mdDialog.cancel();
            };
            self.finish = function($event) {
              $mdDialog.hide();
            };
}])
