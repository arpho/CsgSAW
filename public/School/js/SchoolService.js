'use strict';
var loggedUser = {},token, logged = false;
angular.module('CsgSAW.services').factory('SchoolService', ['$http', function($http) {
    return {
        list: function(token,email){
         var data = {token:token,email:email}
            return $http.post('/api/schools/list/',data)
        }
    }
}])
