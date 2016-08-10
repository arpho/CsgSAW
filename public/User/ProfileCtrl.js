'use strict';
angular.module('csgSAW.controllers').controller('ProfileController',['$scope','UserService',
'$mdDialog','app-messages','$mdMedia','$rootScope',function($scope,Users,$mdDialog,messages,$mdMedia,$rootScope){
    $scope.title = Users.getNome()||'Caro' + " " +(Users.getCognome() ||'amico')
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
    $rootScope.$on('loggedUser',function(ev,args){
        $scope.user = Users.getLoggedUser();
        $scope.title = Users.getNome() + " " +Users.getCognome()
        $scope.user.dob = new Date($scope.user.dob);
    })
    $scope.onlyWeekendsPredicate = function(date) {
        var day = date.getDay();
        return day === 0 || day === 6;
      }
     $scope.submit = function(){
        console.log('updating')
     }
    $scope.user = Users.getLoggedUser();
   if(!Users.isLogged()){
    $scope.login();
   }
}])