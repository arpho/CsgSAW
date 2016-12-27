'use strict';
angular.module('CsgSAW.services').factory('FileService', ['$http','UserService', function($http,UserService) {
        return {splitName: function(name){
                var tags = name.split(' - ')
            /*var file = {}
            file.data = tags[0]
            file.scuola = tags[1]
            file.fase = tags[2]
            file.titolo = tags[3]
            file.relatore = tags[4]*/
            return tags
        },
        setTagFile(tags){
        var registrazione = {data:new Date(tags[0]),scuola:tags[1],fase:tags[2],titolo:tags[3],relatore:tags[4]}
        return registrazione
        },
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