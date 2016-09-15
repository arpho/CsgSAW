'use strict';
angular.module('csgSAW.controllers').controller('SetPathController',['$scope','$rootScope','$mdDialog','app-messages',function($scope,$rootScope,$mdDialog,messages){
var self = this
$scope.title = messages.getMessage('titlePopUp')
$scope.path = messages.getMessage('path')
self.cancel = function(){
                                      $mdDialog.hide()
                      }
                     }]).controller('MyCtrl',['app-messages', function(messages) {
                          this.customOpts = {
                            useCheckboxes: true,
                            onToggle: this.awesomeCallback = function(ev){
                             console.log('clicked item', ev)
                            }
                          };
                          this.otherAwesomeCallback = function(a,b, c){
                            console.log('clicked',a,b,c)
                          }

                          this.bag = messages.getMessage('readPath')
                      }]);
