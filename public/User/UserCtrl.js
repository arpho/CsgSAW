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
                var msg = " Ciao " + $scope.user.nome + " il tuo account è stato creato, quando sarà abilitato dall'amministratore, sarai avvertito con una mail a " + $scope.user.email
                $mdDialog.show(
                          $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Account creato')
                            .textContent(msg)
                            .ariaLabel('Alert Dialog ')
                            .ok('Ok!')
                            .openFrom('#left')
                                              // or an element
                            .closeTo(angular.element(document.querySelector('#right')))
                            //.targetEvent(ev)
                        );

            }
                Users.create(user,callback)
            }
            self.finish = function($event) {
              $mdDialog.hide();
            };
}])
