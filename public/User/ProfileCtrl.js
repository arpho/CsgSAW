'use strict';
angular.module('csgSAW.controllers').controller('ProfileController',['$scope','UserService',
'$mdDialog','app-messages','$mdMedia','$rootScope','RoleService',function($scope,Users,$mdDialog,messages,$mdMedia,$rootScope,Roles){
    $scope.user = Users.getLoggedUser();
    $scope.title = Users.getNome()? 'Ciao '+ Users.getNome() : 'Ciao'
    $scope.tagline = 'gestisci il tuo profilo utente'
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
    $scope.addAuthorization = function(power){
        $scope.user.roles.push(power);
    }

    $scope.removeAuthorization = function(power){
    $scope.user.roles.forEach(function(item,index){
        if(item == power)
        delete $scope.user.roles[index]
    })
    }
    $rootScope.$on('loggedUser',function(ev,args){
        $scope.user = Users.getLoggedUser();
        $scope.title ="Ciao " + Users.getNome()
        $scope.user.dob = new Date($scope.user.dob);
    })
    $scope.onlyWeekendsPredicate = function(date) {
        var day = date.getDay();
        return day === 0 || day === 6;
      }
     $scope.submit = function(){
        Users.update($scope.user,Users.getToken()).then(function(data){
            Users.setToken(data.data.token) //aggiorno il token
            var msg ='utente aggiornato correttamente'
            $mdDialog.show(
                                                   $mdDialog.alert()
                                                     .parent(angular.element(document.querySelector('#popupContainer')))
                                                     .clickOutsideToClose(true)
                                                     .title('profilo utente aggiornato')
                                                     .textContent(msg)
                                                     .ariaLabel('')
                                                     .ok('Ok')
                                                 ).then(function(){
                                                    $rootScope.$emit('updatedUser')
                                                 });

        }).catch(function(data){
                            Users.setToken(data.data.token) //aggiorno il token
                            var msg ='OPs, loggati nuovamente e riprova'
                            $mdDialog.show(
                                                                   $mdDialog.alert()
                                                                     .parent(angular.element(document.querySelector('#popupContainer')))
                                                                     .clickOutsideToClose(true)
                                                                     .title('Profilo utente non aggiornato')
                                                                     .textContent(msg)
                                                                     .ariaLabel('')
                                                                     .ok('Ok')
                                                                 ).then(function(){
                                                                    $rootScope.$emit('updatedUser')
                                                                 });

                        })
     }
    $scope.user = Users.getLoggedUser();
    $scope.user.dob = new Date($scope.user.dob);
   if(!Users.isLogged()){
    $scope.login();
   }
   $scope.SiNo = function(b){
    return b? 'si':'no'
   }
   Roles.list().then(function(res){
   $scope.roles = res.data;
   })

   $scope.gotPower = function(user,power){
        return Users.gotPower(user,power)
   }
}])
