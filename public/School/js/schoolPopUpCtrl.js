'use strict';
angular.module('csgSAW.controllers').controller('SchoolPopUpController',['$scope','UserService','$mdMedia','$mdDialog',
'app-messages', '$cookies',  '$window','$rootScope','SchoolService',function($scope,Users,$mdMedia,$mdDialog,messages, $cookies,
 $window,$rootScope,Schools){
    var self = this
    self.cancel = function(){
                  $mdDialog.hide()
              }
 }
 ])