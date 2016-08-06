'use strict';
angular.module('csgSAW.controllers').controller('LoginController',['$scope','UserService','$mdDialog',function($scope,Users,$mdDialog){
     var self = this;
     $scope.title =' Autenticazione utente'
     $scope.label = "questa è un'etichetta"
     $scope.submiutButton = 'autentica'
        self.cancel = function($event) {
              $mdDialog.hide();
            };
            $scope.user = {}
            $scope.submit = function(user){
                console.log('submit',user)
            delete user['confirm_password'] // rimuovo il campo confirm_password prima di inviare al server l'ogetto
                Users.create(user)
            }
            self.finish = function($event) {
              $mdDialog.hide();
            };
}])