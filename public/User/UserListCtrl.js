'use strict';
angular.module('csgSAW.controllers').controller('UserListController',['$scope','UserService','$mdMedia','$mdDialog',
'app-messages', '$cookies',  '$window','$rootScope',function($scope,Users,$mdMedia,$mdDialog,messages, $cookies,
 $window,$rootScope){
     var data = {token:Users.getToken(),email:Users.getEmail()}
     if(Users.isLogged()){
         Users.list(data).then(function(data){
            $scope.users = data.data.users;
            Users.setToken(data.data.token)
            console.log('ricevuto elenco utenti e aggiornato token')
         });
     }
     else{
        $scope.login();
     }

     $scope.login = function(ev){
                                        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                                        $mdDialog.show({
                                            controller: 'LoginController',
                                            controllerAs: 'ctrl',
                                            templateUrl: 'User/loginPopup.html',
                                            parent: angular.element(document.body),
                                            targetEvent: ev,
                                            clickOutsideToClose: true,
                                            fullScreen: useFullScreen
                                         })
         }

     $rootScope.$on('loggedUser',function(ev,args){
             $scope.user = Users.getLoggedUser();
             $scope.title ="Ciao " + Users.getNome()
             $scope.user.dob = new Date($scope.user.dob);
     var data = {token:Users.getToken(),email:Users.getEmail()}

         Users.list(data).then(function(data){
            $scope.users = data.data.users;
            Users.setToken(data.data.token)
            console.log('ricevuto elenco utenti e aggiornato token')
         });
        console.log('ricevuto elenco utenti e aggiornato token')
     });
}])