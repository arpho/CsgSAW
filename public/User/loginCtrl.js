'use strict';
angular.module('csgSAW.controllers').controller('LoginController',['$scope','UserService','$mdMedia','$mdDialog','app-messages',function($scope,Users,$mdMedia,$mdDialog,messages){
     var self = this;
     $scope.title =' Autenticazione utente'
     $scope.label = "questa è un'etichetta"
     $scope.submiutButton = 'autentica'
        self.cancel = function($event) {
              $mdDialog.hide();
            };
            $scope.user = {}
            $scope.submit = function(user){
                $scope.showSpinner = true;
                console.log('submit',user)
                Users.login(user).then(function(res){
                     console.log('success',res)
                     Users.setLoggedUser(res.data.authenticatingUser)
                     Users.setToken(res.data.token);
                     console.log('token',Users.getToken())
                     Users.setLogged(true);
                     var welcome = "benvenuto " + Users.getNome()
                     messages.putMessage('messaggio_benvenuto',welcome)
                                 $mdDialog.show(
                                       $mdDialog.alert()
                                         .parent(angular.element(document.querySelector('#popupContainer')))
                                         .clickOutsideToClose(true)
                                         .title('Benvenuto')
                                         .textContent(welcome)
                                         .ariaLabel('')
                                         .ok('Ok')
                                     );
                }).catch(function(res){
                console.log('failure',res)
                $mdDialog.show(
                                                       $mdDialog.alert()
                                                         .parent(angular.element(document.querySelector('#popupContainer')))
                                                         .clickOutsideToClose(true)
                                                         .title('Autenticazione non riuscita')
                                                         .textContent('problemi di accesso: hai dimenticato la password? Oppure non sei ancora stato abilitato')
                                                         .ariaLabel('')
                                                         .ok('Ok')
                                                     );
                })
            }
            self.finish = function($event) {
              $mdDialog.hide();
            };
}])