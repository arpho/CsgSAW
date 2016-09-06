'use strict';
var loggedUser = {},token, logged = false;
angular.module('CsgSAW.services').factory('SchoolService', ['$http', function($http) {
    return {
        trash: function(data){
        return $http.post('/api/schools/trash/',data)
        },
        crea: function(data){
            return $http.post('/api/schools/crea/',data)
        },
        list: function(data){
            console.log('richiesta lista scuola')
            return $http.post('/api/schools/list/',data)
        },
        update: function(data){
            return $http.post('/api/schools/update/',data)
        }
    }
}])
