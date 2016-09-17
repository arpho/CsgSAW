'use strict';
angular.module('csgSAW.controllers').controller('SetPathController',['$scope','$rootScope','$mdDialog','app-messages',function($scope,$rootScope,$mdDialog,messages,Configs){
var self = this
$scope.title = messages.getMessage('titlePopUp')
$scope.path = messages.getMessage('path')

self.cancel = function(){
                                      $mdDialog.hide()
                      }
                     }]).controller('PathController',['$scope','$rootScope','app-messages','ConfigService','ivhTreeviewMgr', function($scope,$rootScope,messages,Configs,ivhTreeviewMgr) {
                          this.customOpts = {
                            useCheckboxes: true,
                            onToggle:  function(ev){
                             console.log('clicked item', ev)
                            }
                          };
                          var lastPath,generatePath = function(node, parent){
                              var path = parent[0].label + node.label + '/'
                              return path
                          }
                          this.otherAwesomeCallback = function(a,b, c){
                            console.log('clicked',a,b,c)
                            var path = a.path+'/'|| generatePath(a,c),
                              body = {path:path}
                            console.log('chiederò contenuto di ',path)
                              lastPath = path
                            Configs.readPath(body,function(data){
                            console.log('got path', data)
                            a.children = data.data.data
                            ivhTreeviewMgr.deselectAll(c)
                            a.selected = true;
                            })

                          this.pathSet = function(ev){
                          console.log('setted path:',lastPath)
                          $rootScope.$emit('pathSelected',lastPath)
                          }

                          }

                          this.path = messages.getMessage('readPath')
                      }]);
