'use strict';
angular.module('csgSAW.controllers').controller('FilesController',['$scope','UserService','$mdMedia','$mdDialog',
'app-messages',   '$window','$rootScope','SchoolService','$mdToast','ConfigService','FileUploader',
function($scope,Users,$mdMedia,$mdDialog,messages,
 $window,$rootScope,Schools,$mdToast,Configs,FileUploader){
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
    var uploader = $scope.Uploader = new FileUploader({
                url: '/api/upload/'
            });
    $scope.title = "Elenco registrazioni"
    $scope.user = Users.getLoggedUser()
    console.log('uploader',$scope.Uploader)
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
     initialize()
    })
 }])