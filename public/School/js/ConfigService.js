'use strict';
var loggedUser = {},token, logged = false;
angular.module('CsgSAW.services').factory('ConfigService', ['$http','UserService', function($http,Users) {
    var prepareBody = function(body){
        body.token = Users.getToken()
        body.email = Users.getEmail()
    },
    prepareCallBack = function(cBack){
    return function(payload){
        console.log('prepareCallback',payload)
        Users.setToken(payload.data.token)
        //continuo con il callback del controller
        cBack(payload)
    }
    }


     return {
     retrieve: function(body,cBack){
        prepareBody(body) // aggiungo token e email
        var callBack = prepareCallBack(cBack)
        return $http.post('/api/config/retrieve/',body).then(callBack)
     },
           upsert: function(body,cBack,onError){
              prepareBody(body)
              var callBack = prepareCallBack(cBack)
              $http.post('/api/config/update/',body).then(callBack).catch(onError)
           },
                 list: function(body,cBack){
                    prepareBody(body)
                    $http.post('/api/config/list/',body).then(callBack(cBack))
                 }
     }
}])