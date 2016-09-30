'use strict';
angular.module('csgSAW.controllers').controller('FilesController',['$scope','UserService','$mdMedia','$mdDialog',
'app-messages',   '$window','$rootScope','SchoolService','$mdToast','ConfigService',
function($scope,Users,$mdMedia,$mdDialog,messages,
 $window,$rootScope,Schools,$mdToast,Configs){
 $scope.uploadFile = function(files){

  $scope.fileSelected = function(files) {
      if (files && files.length) {
         $scope.file = files[0];
      }

      /*$upload.upload({
        url: '/api/upload', //node.js route
        file: $scope.file
      })
      .success(function(data) {
        console.log(data, 'uploaded');
       });*/

     };
 };
 var initialize = function(){
    $scope.title = "Elenco registrazioni"
    $scope.user = Users.getLoggedUser()
    console.log('uploader',$scope.uploader)
 }
  $scope.isLogged = Users.isLogged
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

 if(!Users.isLogged()){
     console.log('utente non loggato')
     $scope.login();
    }
 else{
     initialize()
 }

    $rootScope.$on('loggedUser', function(){
    console.log('utente appena  loggato')
     initialize()
    })
 }])