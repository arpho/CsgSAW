'use strict';
angular.module('csgSAW.controllers').controller('SchoolController',['$scope','UserService','$mdMedia','$mdDialog',
'app-messages', '$cookies',  '$window','$rootScope','SchoolService','$mdToast','ConfigService',function($scope,Users,$mdMedia,$mdDialog,messages, $cookies,
 $window,$rootScope,Schools,$mdToast,Configs){
 $scope.showSpinner = false;
 $scope.gotPower = Users.gotPower
 $rootScope.$on('submittedSchool', function(args){
    $mdDialog.hide()
    //$scope.schools = $scope.schools || []
     initialize()
 })
 $rootScope.$on('updatedSchool', function(args){
    $mdDialog.hide()
    messages.putMessage('toastTitle','Conferma');
                            messages.putMessage('toastBody','scuola aggiornata regolarmente')
                        $mdToast.show({
                                      hideDelay   : 5000,
                                      position    : 'top right',
                                      controller  : 'ToastCtrl',
                                      templateUrl : 'views/toast-template.html'
                                    });
    //$scope.schools = $scope.schools || []
     initialize()
 })
 $rootScope.$on('pathSelected',function(ev,args){
 $scope.path.actualValue = args
 $scope.path.label = 'path'
 var body = {config:$scope.path}
 Configs.upsert(body,function(){
    $mdDialog.hide()
    messages.putMessage('toastBody','path registrazioni aggiornato corrrettamente')
                                $mdToast.show({
                                              hideDelay   : 5000,
                                              position    : 'top left',
                                              controller  : 'ToastCtrl',
                                              templateUrl : 'views/toast-template.html'
                                            });

 })
 })
 $scope.edited = function(ev){
    console.log('edited fired',$scope.accountEmail.actualValue)
    var accountEmail = $scope.accountEmail
    var body = {}
    body.config = accountEmail;
    Configs.upsert(body, function(payload){
        messages.putMessage('toastTitle','Eseguito');
                                messages.putMessage('toastBody','account email aggiornato corrrettamente')
                            $mdToast.show({
                                          hideDelay   : 5000,
                                          position    : 'top left',
                                          controller  : 'ToastCtrl',
                                          templateUrl : 'views/toast-template.html'
                                        });

    },function(error){
             messages.putMessage('toastTitle','Non Eseguito');
                                                 messages.putMessage('toastBody',' Account email non  aggiornato corrrettamente')
                                             $mdToast.show({
                                                           hideDelay   : 5000,
                                                           position    : 'top left',
                                                           controller  : 'ToastCtrl',
                                                           templateUrl : 'views/toast-template.html'
                                                         });
         }

    )
 }
 $scope.passwordEdited = function(ev){
    console.log('aggiorno password account email',$scope.emailPassword.actualValue)
    var body = {}
    body.config = $scope.emailPassword;
    body.config.label = body.config.label ||'passwordEmail'
    Configs.upsert(body,function(payload){
    messages.putMessage('toastTitle','Eseguito');
                                    messages.putMessage('toastBody','Password account email aggiornata corrrettamente')
                                $mdToast.show({
                                              hideDelay   : 5000,
                                              position    : 'top left',
                                              controller  : 'ToastCtrl',
                                              templateUrl : 'views/toast-template.html'
                                            });


    },function(error){
        messages.putMessage('toastTitle','Non Eseguito');
                                            messages.putMessage('toastBody','Password account email non  aggiornata corrrettamente')
                                        $mdToast.show({
                                                      hideDelay   : 5000,
                                                      position    : 'top left',
                                                      controller  : 'ToastCtrl',
                                                      templateUrl : 'views/toast-template.html'
                                                    });
    })
 }
 $scope.clickRow = function(ev,school){
    messages.putMessage('activeSchoolPopUpController','SchoolUpdatePopUpController')
 messages.putMessage('addingSchool',school)
 messages.putMessage('schoolPopUpTitle','modifica scuola '+school.denominazione)
 messages.putMessage('schoolPopUpAction','Modifica')
 var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                      $mdDialog.show({
                          controller: 'SchoolUpdatePopUpController',
                          controllerAs: 'ctrl',
                          templateUrl: 'School/views/schoolPopUp.html',
                          targetEvent: ev,
                          parent: angular.element(document.body),
                          clickOutsideToClose: false
                       })
 }
 $scope.trashSchool = function(school){
    var confirm = $mdDialog.confirm()
                      .title('cancellazione scuola')
                      .textContent('vuoi veramente cancellare la scuola: '+school.denominazione+" ?")
                      .ariaLabel('sei sicuro?')
                      .ok('Si cancella')
                      .cancel('No');
            $mdDialog.show(confirm).then(function(){
                console.log('cancellare scuola:',school._id)
                var data = Users.generateDataPayload()
                 data._id = school._id
                 Schools.trash(data).then(function(data){
                    Users.setToken(data.data.token)
                    initialize()
                 }).catch(function(data){
                        messages.putMessage('toastTitle','Ops!!');
                        messages.putMessage('toastBody','qualcosa non è andata bene ')
                        $mdToast.show({
                                      hideDelay   : 5000,
                                      position    : 'top right',
                                      controller  : 'ToastCtrl',
                                      templateUrl : 'views/toast-template.html'
                        });

                 })
            })
 }
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
$scope.pathSet = function(ev){
            var body = {config:'/'}
            Configs.readPath(body,function(data){
                console.log('path',data.data)
                messages.putMessage('readPath',[{label:'/',value:'/',children:data.data.data,path:'/'}])
            })
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            messages.putMessage('titlePopUp','setta il path')
            messages.putMessage('path',$scope.path)
                                 $mdDialog.show({
                                     controller: 'SetPathController',
                                     controllerAs: 'ctrl',
                                     templateUrl: 'School/views/setPath.html',
                                     parent: angular.element(document.body),
                                     targetEvent: ev,
                                     clickOutsideToClose: false,
                                        fullScreen: useFullScreen
                                  })
        }
var initialize = function(){
        $scope.user = Users.getLoggedUser()
        $scope.user.dob = new Date($scope.user.dob);
        var data = Users.generateDataPayload();

         Schools.list(data).then(function(schools){
                $scope.schools = schools.data.data
                Users.setToken(schools.data.token)
                var  body =  {}
                body.config ='accountEmail'
                Configs.retrieve(body,function(payload){
                $scope.accountEmail = payload.data.data[0]
                $scope.accountEmail.label = body.config
                body.config = 'passwordEmail'
                Configs.retrieve(body,function(payload){
                      // inizializzo la configurazione se non esiste
                     $scope.emailPassword = payload.data.data[0] ||{}
                     $scope.emailPassword.label = 'passwordEmail'
                     $scope.emailPassword.actualValue = $scope.emailPassword.actualValue ||""
                     // recupero il setting per il path
                     body.config = 'path'
                     Configs.retrieve(body,function(payload){
                        $scope.path = payload.data.data[0] || {}
                        $scope.path.label = 'path'
                     })
                })
                })
            })
         }
$scope.title = 'Gestione Sistema'

$scope.addSchool = function(ev){
    messages.putMessage('activeSchoolPopUpController','SchoolCreatePopUpController')
        $scope.school = messages.getMessage('addingSchool')||{}
         messages.putMessage('schoolPopUpAction','aggiungi scuola')
         var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                     $mdDialog.show({
                         controller: 'SchoolCreatePopUpController',
                         controllerAs: 'ctrl',
                         templateUrl: 'School/views/schoolPopUp.html',
                         parent: angular.element(document.body),
                         targetEvent: ev,
                         clickOutsideToClose: false
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
    $rootScope.$on('addedSchoolContact',function(ev,args){
        $scope.school = messages.getMessage('addingSchool') // inizializzo $scope.school
        $scope.school.contacts = $scope.school.contacts || []
        $scope.school.contacts.push(args)
        //TODO occorre aprire schoolPopup con il giusto controller
        console.log('school with contacts',$scope.school)
        $mdDialog.show({
                                 controller: messages.getMessage('activeSchoolPopUpController'),
                                 controllerAs: 'ctrl',
                                 templateUrl: 'School/views/schoolPopUp.html',
                                 parent: angular.element(document.body),
                                 targetEvent: ev,
                                 clickOutsideToClose: false
                              })// riapro il popup school
    })
    $rootScope.$on('addedSchoolAddress',function(ev,args){
        $scope.school = messages.getMessage('addingSchool') // inizializzo $scope.school
        $scope.school.address = $scope.school.address || []
        $scope.school.address.push(args)
        console.log('school with address',$scope.school)
        $mdDialog.show({
                                 controller: messages.getMessage('activeSchoolPopUpController'),
                                 controllerAs: 'ctrl',
                                 templateUrl: 'School/views/schoolPopUp.html',
                                 parent: angular.element(document.body),
                                 targetEvent: ev,
                                 clickOutsideToClose: false
                              })// riapro il popup school
    })
    $rootScope.$on('loggedUser',function(ev,args){
    initialize();

    })

}])
