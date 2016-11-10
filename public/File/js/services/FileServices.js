'use strict';
angular.module('CsgSAW.services').factory('FileService', ['$http','UserService', function($http,UserService) {
        return {
        upload : function(formData,callback){
            var payload = UserService.generateDataPayload()
            formData.append('token',payload.token)
            formData.append('email',payload.email)
            $http.post('/api/upload/', formData, {
               transformRequest: angular.identity,
               headers: {'Content-Type': undefined,
               params: {
                             formData
                           },
                           responseType: "arraybuffer"

//               processData: false
               }
            }).then(function(data){
            console.log('uploaded',data)
            }).catch(function(a){
                console.log('problemi uploading',a)
            })
        }
        }
        }
    ])