'use strict';
angular.module('csgSAW.controllers').controller('SchoolController',['$scope','UserService','$mdMedia','$mdDialog',
'app-messages', '$cookies',  '$window','$rootScope','SchoolService',function($scope,Users,$mdMedia,$mdDialog,messages, $cookies,
 $window,$rootScope,Schools){
 $scope.showSpinner = false;
 $scope.gotPower = Users.gotPower
 $scope.login = function(ev){
                                    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                                    $mdDialog.show({
                                        controller: 'LoginController',
                                        controllerAs: 'ctrl',
                                        templateUrl: 'User/loginPopup.html',
                                        parent: angular.element(document.body),
                                        targetEvent: ev,
                                        clickOutsideToClose: false,
                                        fullScreen: useFullScreen
                                     })
     }
var initialize = function(){
$scope.user = Users.getLoggedUser()
        $scope.user.dob = new Date($scope.user.dob);
         Schools.list(Users.getToken(),Users.getEmail()).then(function(schools){
                $scope.schools = schools.data.data
                Users.setToken(schools.data.token)
                console.log('got schools',schools)
            })
         }
$scope.title = 'gestione scuole gnosis'
if(!Users.isLogged()){
    $scope.login();
   }

    $rootScope.$on('loggedUser',function(ev,args){
    initialize();

    })

}])
