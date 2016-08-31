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
            })
         }
$scope.title = 'Gestione Sistema'
initialize()
$scope.addSchool = function(ev){ //TODO usare un semplice prompt dialog
         messages.putMessage('schoolPopUpAction','aggiungi scuola')
         var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                     $mdDialog.show({
                         controller: 'SchoolPopUpController',
                         controllerAs: 'ctrl',
                         templateUrl: 'School/views/schoolPopUp.html',
                         parent: angular.element(document.body),
                         targetEvent: ev,
                         clickOutsideToClose: false,
                         fullScreen: useFullScreen
                      })

}
if(!Users.isLogged()){
    $scope.login();
   }
    $rootScope.$on('addedSchoolContact',function(ev,args){
        console.log('nuovo contatto', args)
        $scope.school.contacts.push(args.contact)
    })
    $rootScope.$on('loggedUser',function(ev,args){
    initialize();

    })

}])
