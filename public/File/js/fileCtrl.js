'use strict';
angular.module('csgSAW.controllers').controller('FilesController',['$scope','UserService','$mdMedia','$mdDialog',
'app-messages',   '$window','$rootScope','$mdToast','ConfigService','FileService','Upload','$q',
function($scope,Users,$mdMedia,$mdDialog,messages,
 $window,$rootScope,$mdToast,Configs,FileService,Upload,$q){
$scope.batchImport = function() {
        console.log('batchImport')
        FileService.batchImport({},function(resp) {
            console.log('batch concluso bene',resp)
        },function(resp) {
            console.log('batch concluso male',resp)
        })
    }

var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
 var vm = this,showshowUPloadPopup = function(){
    $mdDialog.show({
                                 controller: 'UploadController',
                                 controllerAs: 'ctrl',
                                 templateUrl: 'File/views/FileUploadPopup.html',
                                 parent: angular.element(document.body),
                                 targetEvent: null,
                                 clickOutsideToClose: false,
                                 fullScreen: useFullScreen
                              })
 },
 checkFile = function(data,callback){
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    // il controllo passerà ad UploadController quindi passo data all'altro controller
    messages.putMessage('uploadingFile',data)
    showshowUPloadPopup()
 }
    $rootScope.$on('showuploadPopup',showshowUPloadPopup)
     vm.submit = function(){ //function to call on form submit
         if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
             vm.upload(vm.file); //call upload function
         }
     }
 $rootScope.$on('uploadedFileSuccesed',function(evt,data){
    console.log('uploaded')
    self.uploaded = true
 })
 vm.upload = function(file){
    console.log('upload')
    var data = new FormData()
    data.append('registrazione',file)
    checkFile(data,function(data){


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
 var changePage = function(limits) {
    $scope.showSpinner = true
    FileService.filesList(limits,function(resp){
        $scope.showSpinner = false
        $scope.filesList = resp.data.files
        $scope.limits = limits
        if ($scope.actualPage == $scope.pages)
        $scope.limits.end = $scope.filesCount
    })
 }
 var initialize = function(){
    $scope.limits = {}
    $scope.actualPage = 1
    $scope.limits.start = 1
    $scope.limits.end = 100
    $scope.offset = 100
    $scope.showSpinner = true
    $scope.nextPage  = function(actualPage ) {
        if( actualPage<=$scope.pages){
            $scope.actualPage = actualPage +1
            var limits = FileService.calculateLimits($scope.actualPage,$scope.offset)
            changePage(limits)
        }
    }
    $scope.previousPage = function(actualPage) {
        if(actualPage>1){
            $scope.actualPage = actualPage -1
             var limits = FileService.calculateLimits($scope.actualPage,$scope.offset)
             changePage(limits)
        }
    }
    var data = { start:0,end:100},
    oneMorePage = function(result) {
        if(Math.floor(result.filesList.data.count/$scope.offset)*$scope.offset< result.filesList.data.count)
                    return 1
                 else
                    return 0
    },
    promises = {
    filesList :FileService.filesList(data)
    }
    $q.all(promises).then(function(result){
        //console.log('$q then',result)
        $scope.filesList = result.filesList.data.files
        $scope.filesCount = result.filesList.data.count
        $scope.showSpinner = false
        $scope.pages = Math.floor(result.filesList.data.count/$scope.offset) + oneMorePage(result)
    })

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
 }]).controller('UploadController',['$scope','$rootScope','$mdDialog','app-messages','FileService','SchoolService','UserService',
 function($scope,$rootScope,$mdDialog,Messages,FileService,Schools,User)
 {
    $scope.title = 'Verifica dati  registrazione'
    var self = this, data = User.generateDataPayload(), // preparo la richiesta al server per la lista delle scuole
    buildName = FileService.buildNameFromTags

    self.cancel = function(){
                                              $mdDialog.hide()
                              }

    Schools.list(data).then(function(data){
    //console.log('callback lista scuole',data)
    $scope.schoolsList = data.data
    User.setToken(data.data.token)
    })
    $scope.showSpinner = false

    var data = Messages.getMessage('uploadingFile'),
        formatData = function(date){
            return
        },
        name = data.get('registrazione').name, //recupero il nome del file
        estensione = name.substring(name.length-4), // estraggo l'ìestensione del file con il punto
        nomeFile = name.substring(0,name.length-4), // rimuovo l'estensione del file
        tags = FileService.splitName(nomeFile) // estraggo i tag dal titolo del file
        $scope.registrazione = FileService.setTagFile(tags)
        $scope.registrazione.estensione = estensione
        self.azione = "carica registrazione"
        var upload = function(registrazione)
        {
            $scope.showSpinner = true
                         // aggiungo i tags al dataform
                        data.append("dataRegistrazione", registrazione.data)
                        data.append("scuola",registrazione.scuola)
                        data.append("fase",registrazione.fase)
                        data.append("relatore",registrazione.relatore)
                        data.append("titolo",registrazione.titolo)
                        data.append("estensione",estensione)
                        data.append("nomeFile",buildName(registrazione))
                        data.append("operatore",User.get_id())
                        data.append("data" ,FileService.formatData(registrazione.data))
                        data.append("relativePath",FileService.buildRelativePath(registrazione))
                        //invio la richiesta al server
                        FileService.upload(data,
                                    function(data){
                                        self.cancel()
                                        $scope.showSpinner = false
                                        $mdDialog.show(
                                              $mdDialog.alert()
                                                .parent(angular.element(document.querySelector('#popupContainer')))
                                                .clickOutsideToClose(true)
                                                .title('Esito upload')
                                                .textContent('file caricato sul server normalmente')
                                                .ariaLabel('Alert Dialog ')
                                                .ok('Ok!')
                                            );
                                    $rootScope.$emit('uploadedFileSuccesed')
                                    },
                                    function(data){
                                        self.cancel()
                                        $scope.showSpinner = false
                                        var text = 'il file non è stato caricato correttamente'
                                        if(data.data.tokenExpired) text = 'il token è scaduto! Effettua nuovamente il login e prova ancora'
                                        $scope.showASpinner = false
                                        $mdDialog.show(
                                              $mdDialog.alert()
                                                .parent(angular.element(document.querySelector('#popupContainer')))
                                                .clickOutsideToClose(true)
                                                .title('Esito Upload')
                                                .textContent(text)
                                                .ariaLabel('Alert Dialog ')
                                                .ok('OK!')
                                            );
                                    }
                        )
        }
    $scope.submit = function(registrazione){
        var path = FileService.buildRelativePath(registrazione), nomeFile = buildName(registrazione)
        var data = {relativePath:path,nomeFile:nomeFile,estensione:registrazione.estensione}
        FileService.fileExists(data,function(resp){
        console.log('fileExists success', resp)
        if(resp.data.exists){
            var confirm = $mdDialog.confirm()
                              .title('una registrazione con gli stessi dati è già presente ')
                              .textContent('caricando questa registrazione sostituirai quella presente sul server')
                              .ariaLabel('Lucky day')
                              .ok('carica comunque')
                              .cancel('Lascia perdere');

                        $mdDialog.show(confirm).then(function() {
                         $rootScope.$emit('showuploadPopup') // questo messaggio indica a fileController di mostrare uploadPopup
                          upload(registrazione) // invio la richiesta al server
                        }, function() {
                            self.cancel()
                        });
        }
        else{
            upload(registrazione)
        }
        },function(resp)
        {
            console.log('fileExist failure',resp)
        })
          };
        //

    }



 ])