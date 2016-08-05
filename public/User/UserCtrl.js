'use strict';
angular.module('csgSAW.controllers').controller('UserController',['$scope','UserService','$mdDialog',function($scope,Users,$mdDialog){
     var self = this;
     $scope.title =' Registrazione utente'
     $scope.label = "questa è un'etichetta"
        self.cancel = function($event) {
              $mdDialog.hide();
            };
            $scope.user = {}
            $scope.submit = function(user){
                console.log('submit',user)
                Users.create(user)
            }
            self.finish = function($event) {
              $mdDialog.hide();
            };
}])
