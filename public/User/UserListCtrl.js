'use strict';
angular.module('csgSAW.controllers').controller('UserListController',['$scope','UserService','$mdMedia','$mdDialog',
'app-messages', '$cookies',  '$window','$rootScope','$mdToast',function($scope,Users,$mdMedia,$mdDialog,messages, $cookies,
 $window,$rootScope,$mdToast){
     var data = {token:Users.getToken(),email:Users.getEmail()}
     if(Users.isLogged()){
         Users.list(data).then(function(data){
            $scope.users = data.data.users;
            Users.setToken(data.data.token)
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
         $scope.search = true;
         $scope.enableUser = function(user){
         user.enabled = true;
         Users.update(user,Users.getToken(),Users.getEmail()).then(function(res){
         Users.setToken(res.data.token)
         $mdToast.show(
            $mdToast.simple()
            .textContent(user.nome+" è stato abilitato")
            .position('top right')
            .hideDelay(3000)
         );

         }).catch(function(res){
            $mdToast.show(
                  $mdToast.simple()
                    .textContent('problemi')
                    .position('top right')
                    .hideDelay(3000)
            )
         })
         }

    $scope.trashUser = function(user){
        var confirm = $mdDialog.confirm()
                  .title('cancellazione utente')
                  .textContent('vuoi veramente cancellare '+user.email+" ?")
                  .ariaLabel('sei sicuro?')
                  .ok('Si rimuovilo')
                  .cancel('No, lo perdono');
        $mdDialog.show(confirm).then(function(){
            Users.trash(user._id,Users.getToken(),Users.getEmail()).then(function(res){
                Users.setToken(res.data.token)
            })
        },function(){
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
         });
     });
}]).filter('AbilitatiSiNo',function(){
    return function(value){
        return value? 'abilitati':'non abilitati'
    }
})