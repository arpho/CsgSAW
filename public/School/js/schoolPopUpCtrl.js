'use strict';
//TODO creare controller per popup modifica scuola
angular.module('csgSAW.controllers').controller('SchoolPopUpController',['$scope','UserService','$mdMedia','$mdDialog',
'app-messages', '$cookies',  '$window','$rootScope','SchoolService',function($scope,Users,$mdMedia,$mdDialog,messages, $cookies,
 $window,$rootScope,Schools){
    var self = this
    $scope.school = messages.getMessage('addingSchool')|| {} // inizializzo $scope.scope con i volori inseriti fino a questo momento
    $scope.addAddress = function(ev){
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                messages.putMessage('addingSchool',$scope.school)// memorizzo $scope.school per ritrovarlo quando ricarico lo schoolPopUp
                $mdDialog.show({
                    controller: 'AddSchoolAddressController',
                    controllerAs: 'ctrl',
                    templateUrl: 'User/AddressPopup.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullScreen: useFullScreen
                })
    }
    $scope.addContact = function(ev){
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
        messages.putMessage('addingSchool',$scope.school)// memorizzo $scope.school per ritrovarlo quando ricarico lo schoolPopUp
        $mdDialog.show({
            controller: 'AddSchoolContactController',
            controllerAs: 'ctrl',
            templateUrl: 'User/ContactPopup.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            fullScreen: useFullScreen
        })
    }
    $scope.addFolder = function(ev){
        console.log('aggiungi folder')
    }
    $scope.title = messages.getMessage('schoolPopUpTitle')||'creazione nuova scuola'
    var data = Users.generateDataPayload()
    Users.list(data).then(function(payload){
        self.users = payload.data.users
        Users.setToken(payload.data.token)
    })
    $scope.azione = messages.getMessage('schoolPopUpAction')
    self.cancel = function(){
                  $mdDialog.hide()
              }
    $scope.submit = function(school){
        console.log('submitTED SCHOOL ',school)
        messages.putMessage('addingSchool',{})
        var payload = Users.generateDataPayload()
        payload.school = school
        Schools.crea(payload).then(function(data){
            Users.setToken(data.data.token)
            $rootScope.$emit("submittedSchool",data.data.school)
        })

    }
 }
 ]).controller('AddSchoolContactController',['$scope','$rootScope','$mdDialog',function($scope,$rootScope,$mdDialog){
                         $scope.title = 'nuovo contatto scuola'
                         $scope.azione = 'aggiungi'
                         $scope.contact = {};
                         var self = this;
                         this.contact = $scope.contact
                         this.contact.type = '';
                         this.contactTypes = contactTypes

                         self.cancel = function(){
                             $mdDialog.hide()
                         }
                         $scope.submit = function(contact){
                             $rootScope.$emit('addedSchoolContact',contact);

                         }
                     }]).controller('AddSchoolAddressController',['$scope','$rootScope','$mdDialog',function($scope,$rootScope,$mdDialog){
                                              $scope.title = 'nuovo indirizzo scuola'
                                              $scope.azione = 'aggiungi'
                                              $scope.contact = {};
                                              var self = this;
                                              this.contact = $scope.contact
                                              this.contact.type = '';
                                              this.contactTypes = contactTypes

                                              self.cancel = function(){
                                                  $mdDialog.hide()
                                              }
                                              $scope.submit = function(contact){
                                                  $rootScope.$emit('addedSchoolAddress',contact);

                                              }
                                          }]).controller('SchoolUpdatePopUpController',['$scope','UserService','$mdMedia','$mdDialog',
                     'app-messages', '$cookies',  '$window','$rootScope','SchoolService',function($scope,Users,$mdMedia,$mdDialog,messages, $cookies,
                      $window,$rootScope,Schools){
                         var self = this
                         $scope.school = messages.getMessage('addingSchool')|| {} // inizializzo $scope.scope con i volori inseriti fino a questo momento
                         $scope.addAddress = function(ev){
                             console.log('aggiungi address')

                             var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                                             messages.putMessage('addingSchool',$scope.school)// memorizzo $scope.school per ritrovarlo quando ricarico lo schoolPopUp
                                             $mdDialog.show({
                                                 controller: 'AddSchoolAddressController',
                                                 controllerAs: 'ctrl',
                                                 templateUrl: 'User/AddressPopup.html',
                                                 parent: angular.element(document.body),
                                                 targetEvent: ev,
                                                 clickOutsideToClose: false,
                                                 fullScreen: useFullScreen
                                             })
                         }
                         $scope.addContact = function(ev){
                             var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                             messages.putMessage('addingSchool',$scope.school)// memorizzo $scope.school per ritrovarlo quando ricarico lo schoolPopUp
                             $mdDialog.show({
                                 controller: 'AddSchoolContactController',
                                 controllerAs: 'ctrl',
                                 templateUrl: 'User/ContactPopup.html',
                                 parent: angular.element(document.body),
                                 targetEvent: ev,
                                 clickOutsideToClose: false,
                                 fullScreen: useFullScreen
                             })
                         }
                         $scope.addFolder = function(ev){
                             console.log('aggiungi folder')
                         }
                         $scope.title = messages.getMessage('schoolPopUpTitle')||'modifica scuola'
                         var data = Users.generateDataPayload()
                         Users.list(data).then(function(payload){
                             self.users = payload.data.users
                             Users.setToken(payload.data.token)
                         })
                         $scope.azione = messages.getMessage('schoolPopUpAction')
                         self.cancel = function(){
                                       $mdDialog.hide()
                                   }
                         $scope.submit = function(school){
                             console.log('submitTED SCHOOL ',school)
                             messages.putMessage('addingSchool',{})
                             var payload = Users.generateDataPayload()
                             payload.school = school
                             Schools.update(payload).then(function(data){
                                 Users.setToken(data.data.token)
                                 $rootScope.$emit("updatedSchool",data.data.school)
                             })

                         }
                      }
                      ])