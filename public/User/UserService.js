'use strict';
angular.module('CsgSAW.services').factory('UserService', ['$http', function($http) {
    return {
        create: function(user){
            console.log('registering',user)
        }
    }


}]);