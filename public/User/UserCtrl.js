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
            $scope.showSpinner = true
                console.log('submit',user)
            //delete user['confirm_password'] // rimuovo il campo confirm_password prima di inviare al server l'ogetto
            var callback = function(){
                $scope.showSpinner = false;
            }
                Users.create(user,callback)
            }
            self.finish = function($event) {
              $mdDialog.hide();
            };
}])
