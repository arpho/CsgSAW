'use strict';
angular.module('CsgSAW.services').factory('FileService', ['$http','UserService', function($http,UserService) {
        return {
        upload : function(data,callbackSuccess, callbackFailure){
            var payload = UserService.generateDataPayload()
            /*data.token = payload.token
            data.email = payload.email*/
            data.append('token',payload.token)
            data.append('email',payload.email)
            $http.post('/api/upload/', data, {
               transformRequest: angular.identity,
               headers: {'Content-Type': undefined,
               params: {
                             data
                           },
                           responseType: "arraybuffer"

//               processData: false
               }
            }).then(function(data){
            console.log('uploaded',data)
            callbackSuccess(data)
            }).catch(function(a){
                console.log('problemi uploading',a)
                callbackFailure(a)
            })
        }
        }
        }
    ])