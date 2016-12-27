'use strict';
angular.module('csgSAW.controllers').controller('FilesController',['$scope','UserService','$mdMedia','$mdDialog',
'app-messages',   '$window','$rootScope','$mdToast','ConfigService','FileService','Upload',
function($scope,Users,$mdMedia,$mdDialog,messages,
 $window,$rootScope,$mdToast,Configs,FileService,Upload){



 var vm = this,
 checkFile = function(data,callback){
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    // ilcontrollo passerà ad UploadController quindi passo data all'altro controller
    messages.putMessage('uploadingFile',data)
                         $mdDialog.show({
                             controller: 'UploadController',
                             controllerAs: 'ctrl',
                             templateUrl: 'File/views/FileUploadPopup.html',
                             parent: angular.element(document.body),
                             targetEvent: null,
                             clickOutsideToClose: false,
                             fullScreen: useFullScreen
                          })
 }
     vm.submit = function(){ //function to call on form submit
         if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
             vm.upload(vm.file); //call upload function
         }
     }

 vm.upload = function(file){
    console.log('upload')
    var data = new FormData()
    data.append('registrazione',file)
    checkFile(data,function(data){
        FileService.upload(data,
            function(data){
                console.log('callback success',data)
            },
            function(data){
                console.log('callback failure',data)
            }
            )

    })

  }
 $scope.uploadFile = function(files){
     if (vm.file){
        vm.upload(vm.file)
     }

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
    //a simple model to bind to and send to the server
        $scope.model = {
            name: "",
            comments: ""
        };

        //an array of files selected
        $scope.files = [];
        //listen for the file selected event
            $scope.$on("fileSelected", function (event, args) {
                $scope.$apply(function () {
                    //add the file object to the scope's files collection
                    $scope.files.push(args.file);
                });
            });

            $scope.uploadFileOld = function(registrazione){
            console.log('uploading');
            var formData = new FormData();
            formData.append('regitrazione',$scope.files[0])
            console.log('invoco il servizio',$scope.files)
            FileService.upload(formData,function(a){
                console.log('callback upload',a)
            })

            }
            $scope.save = function() {
                $http({
                    method: 'POST',
                    url: "/api/upload/",
                    //IMPORTANT!!! You might think this should be set to 'multipart/form-data'
                    // but this is not true because when we are sending up files the request
                    // needs to include a 'boundary' parameter which identifies the boundary
                    // name between parts in this multi-part request and setting the Content-type
                    // manually will not set this boundary parameter. For whatever reason,
                    // setting the Content-type to 'false' will force the request to automatically
                    // populate the headers properly including the boundary parameter.
                    headers: { 'Content-Type': false },
                    //This method will allow us to change how the data is sent up to the server
                    // for which we'll need to encapsulate the model data in 'FormData'
                    transformRequest: function (data) {
                        var formData = new FormData();
                        //need to convert our json object to a string version of json otherwise
                        // the browser will do a 'toString()' on the object which will result
                        // in the value '[Object object]' on the server.
                        formData.append("model", angular.toJson(data.model));
                        //now add all of the assigned files
                        for (var i = 0; i < data.files; i++) {
                            //add each file to the form data and iteratively name them
                            formData.append("file" + i, data.files[i]);
                        }
                        return formData;
                    },
                    //Create an object that contains the model and files which will be transformed
                    // in the above transformRequest method
                    data: { model: $scope.model, files: $scope.files }
                }).
                success(function (data, status, headers, config) {
                    alert("success!");
                }).
                error(function (data, status, headers, config) {
                    alert("failed!");
                });
            };

    /*var uploader = $scope.Uploader = new FileUploader({
                url: '/api/upload/'
            });*/
    $scope.title = "Elenco registrazioni"
    $scope.user = Users.getLoggedUser()
    //console.log('uploader',$scope.Uploader)
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
 }]).controller('UploadController',['$scope','$rootScope','$mdDialog','app-messages','FileService','SchoolService','UserService',function($scope,$rootScope,$mdDialog,Messages,FileService,Schools,User){
    $scope.title = 'Verifica dati  registrazione'
    var self = this, data = User.generateDataPayload() // preparo la richiesta al server per la lista delle scuole
    Schools.list(data).then(function(data){
    //console.log('callback lista scuole',data)
    $scope.schoolsList = data.data
    User.setToken(data.token)
    })
    self.azione = "carica registrazione"
    var data = Messages.getMessage('uploadingFile'),
    tags = FileService.splitName(data.get('registrazione').name)
    if (tags.length==5){
    $scope.registrazione = FileService.setTagFile(tags)
    }
    self.cancel = function(){
                                          $mdDialog.hide()
                          }
 }])