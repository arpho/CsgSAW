'use strict';
var loggedUser = {},token, logged = false;
angular.module('CsgSAW.services').factory('RoleService', ['$http', function($http) {
return {
    list: function(){
        return $http.get('/api/role/')
    }
}
}])
