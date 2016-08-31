'use strict';
angular.module('csgSAW.controllers').controller('SchoolPopUpController',['$scope','UserService','$mdMedia','$mdDialog',
'app-messages', '$cookies',  '$window','$rootScope','SchoolService',function($scope,Users,$mdMedia,$mdDialog,messages, $cookies,
 $window,$rootScope,Schools){
    var self = this
    $scope.school = {}
    $scope.addAddress = function(ev){
        console.log('aggiungi address')
    }
    $scope.addContact = function(ev){
        console.log('aggiungi contatto')
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
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
    $scope.title = 'creazione nuova scuola'
    var data = Users.generateDataPayload()
    Users.list(data).then(function(payload){
        console.log('payload',payload)
        self.users = payload.data.users
        Users.setToken = payload.data.token
    })
    $scope.azione = messages.getMessage('schoolPopUpAction')
    self.cancel = function(){
                  $mdDialog.hide()
              }
    $scope.submit = function(school){
        console.log('submit ',school)
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
                  }])