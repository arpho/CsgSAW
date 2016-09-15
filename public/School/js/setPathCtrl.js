'use strict';
angular.module('csgSAW.controllers').controller('SetPathController',['$scope','$rootScope','$mdDialog','app-messages',function($scope,$rootScope,$mdDialog,messages){
var self = this
$scope.title = messages.getMessage('titlePopUp')
$scope.path = messages.getMessage('path')
this.bag = [{
      label: 'Glasses',
      value: 'glasses',
      children: [{
        label: 'Top Hat',
        value: 'top_hat'
      },{
        label: 'Curly Mustache',
        value: 'mustachio'
      }]
      }]
self.cancel = function(){
                                      $mdDialog.hide()
                      }
                     }]).controller('MyCtrl', function() {
                          this.customOpts = {
                            useCheckboxes: true,
                            onToggle: this.awesomeCallback = function(ev){
                             console.log('clicked item', ev)
                            }
                          };
                          this.otherAwesomeCallback = function(a,b, c){
                            console.log('clicked',a,b,c)
                          }
                          this.bag = [{
                              label: 'Glasses',
                              value: 'glasses',
                              selected:false,
                              children: [{
                                label: 'Top Hat',
                                value: 'top_hat',
                                                                              selected:false
                              },{
                                label: 'Curly Mustache',
                                value: 'mustachio',
                                                                                selected:false
                              }]
                          }]
                      });
