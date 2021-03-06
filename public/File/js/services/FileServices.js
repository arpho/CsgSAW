'use strict';
var formatData = function(data){
                             return data.getYear()+ 1900 +'-'+(data.getMonth()+1) +'-' + data.getDate()
                         }


angular.module('CsgSAW.services').factory('FileService', ['$http','UserService','$window', function($http,UserService,$window) {
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
        buildRelativePath: function(registrazione){
        //TODO implementare la logicadi questa funzione
            return '/2_ARCHIVIO\ REGISTRAZIONI/8_FASE\ B/B20_Fogueo\ Studenti\ Fase B/'
        },
        formatData : formatData,
        buildNameFromTags : function(tags){
        /*
        costruisce il nome del file dati i tags impostati nello uploadPopup
        @param: tags {data:Date,titolo:String,relatore:String,fase:String,scuola:String}
        @return: il nome del file da archiviare:String
        */
                                var data = tags.data, sep = ' - '
                                return data.getYear()+ 1900 +'-'+(data.getMonth()+1) +'-' + data.getDate() + sep + tags.scuola + sep + tags.fase + sep + tags.titolo + sep + tags.relatore
                                },
        filesList : function(data,callbackSuccess,callbackFailure) {
            var payload = UserService.generateDataPayload()
                        data.token = payload.token
                        data.email = payload.email
                        return $http.post('/api/fileList/',data).then(function(resp) {
                                                             UserService.setToken(resp.data.token) // rinnovo il token

                                                             if(callbackSuccess) {
                                                                callbackSuccess(resp)
                                                             }
                                                             else
                                                                return resp
                                                             })

        },
        downloadFile :(data) => {
            return $http.post('/api/downloadFile/',data)
        },
        removeElementById : function(list, element) {
        /*
        rimuove un elemento da una lista un base al suo _id
         @param lista di oggetti[element]
         @param element oggetto da rimuovere
         @note gli elementi devono avere il campo _id
        */
            for (var i = 0;i<list.length; i++) {
             if(list[i]._id == element._id)
                list.splice(i,1)
            }
        },
        calculateLimits : function(actualPage,offset) {
        /*
            calcola  i limityi da inviare al server per il paging
        */
            var out = {}
            out.start = (actualPage-1)  * offset
            out.end = actualPage * offset
             return out

        },
        fileExists : function(data,callbackSuccess,callbackFailure)
        {
            var payload = UserService.generateDataPayload()
            data.token = payload.token
            data.email = payload.email
            $http.post('/api/fileExists/',data).then(function(resp)
                                                {
                                                UserService.setToken(resp.data.token) // rinnovo il token
                                                callbackSuccess(resp)
                                                }).catch(function(resp)
                                                {
                                                    UserService.setToken(resp.data) // rinnovo il token
                                                    callbackFailure(resp)
                                                })
        },
        download : function(data,callbackSuccess,callbackFailure) {
          var payload = UserService.generateDataPayload()
          data.token = payload.token
          data.email = payload.email
          $http.post('/api/download/',data, {responseType:'arraybuffer'}).then(function(resp) {
            //UserService.setToken(resp.data.token)
            //$window.open('/download','_self');
            callbackSuccess(resp)
          }).catch(function(resp){
            UserService.setToken(resp.data.token)
            callbackFailure(resp)
          })
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
            }).then(function(resp){
            UserService.setToken(resp.data.token)
            callbackSuccess(resp)
            }, function (resp) {
                         console.log('Error status: ' + resp.status);
                     }, function (evt) {
                         var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                         console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                     }).catch(function(a){
                console.log('problemi uploading',a)
            UserService.setToken(data.data.token)
                callbackFailure(a)
            })
        },
        batchImport : function(data,callbackSuccess,callbackFailure) {
                    var payload = UserService.generateDataPayload()
                                data.token = payload.token
                                data.email = payload.email
                                $http.post('/api/batchImport/',data).then(function(resp) {
                                    UserService.setToken(resp.data.token)
                                    callbackSuccess(resp)
                                }).catch(function(resp) {
                                    UserService.setToken(resp.data.token)
                                    callbackFailure(resp)
                                })
                },
        }
        }
    ])
