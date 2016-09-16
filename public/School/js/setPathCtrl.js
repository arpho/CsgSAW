'use strict';
angular.module('csgSAW.controllers').controller('SetPathController',['$scope','$rootScope','$mdDialog','app-messages',function($scope,$rootScope,$mdDialog,messages,Configs){
var self = this
$scope.title = messages.getMessage('titlePopUp')
$scope.path = messages.getMessage('path')

self.cancel = function(){
                                      $mdDialog.hide()
                      }
                     }]).controller('PathController',['app-messages','ConfigService', function(messages,Configs,ivhTreeviewMgr) {
                          this.customOpts = {
                            useCheckboxes: true,
                            onToggle:  function(ev){
                             console.log('clicked item', ev)
                            }
                          };
                          var generatePath = function(node, parent){
                              var path = parent[0].label + node.label + '/'
                              return path
                          }
                          this.otherAwesomeCallback = function(a,b, c){
                            console.log('clicked',a,b,c)
                            console.log('chiederò contenuto di ',generatePath(a,c))
                            var path = a.path+'/'|| generatePath(a,c),
                              body = {path:path}
                            Configs.readPath(body,function(data){
                            console.log('got path', data)
                            a.children = data.data.data
                            ivhTreeviewMgr.deselectEach(c)
                            })



                          }

                          this.path = messages.getMessage('readPath')
                      }]);
