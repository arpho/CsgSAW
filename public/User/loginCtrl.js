'use strict';
angular.module('csgSAW.controllers').controller('LoginController',['$scope','UserService','$mdMedia','$mdDialog',
'app-messages', '$cookies', '$cookieStore', '$window',function($scope,Users,$mdMedia,$mdDialog,messages, $cookies,
$cookieStore, $window){
     var self = this;
     $scope.daRicordare = function(b){
     if (b) return 'Si'
     return 'No'
     }
     $scope.title =' Autenticazione utente'
     $scope.label = "questa è un'etichetta"
     $scope.submiutButton = 'autentica'
        self.cancel = function($event) {
              $mdDialog.hide();
            };
            $scope.user = {}
            $scope.user.remember = $cookieStore.get('remember')
            $scope.user.email = $cookieStore.get('username')
            $scope.user.password = $cookieStore.get('password')
            $scope.submit = function(user){
                $scope.showSpinner = true;
                console.log('submit',user)
                Users.login(user).then(function(res){
                     console.log('success',res)
                     if($scope.user.remember){
                        Date.prototype.addDays = function(days)
                        {
                            var dat = new Date(this.valueOf());
                            dat.setDate(dat.getDate() + days);
                            return dat;
                        }
                        var today = new Date();
                        $cookieStore.put('username',$scope.user.email,{expires:today.addDays(30)})
                        $cookieStore.put('password',$scope.user.password,{expires:today.addDays(30)})
                        $cookieStore.put('remember',$scope.user.remember,{expires:today.addDays(30)})
                     }
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