'use strict';
var User = {};
angular.module('CsgSAW.services').factory('UserService', ['$http', function($http) {
    return {
        create: function(user,callback){
        user
            console.log('creating',user)
               $http.post('/api/user/create/',user).then(function(a){

                console.log('user created',a)
                callback();
            }).catch(function(b){console.log('problems',b)})
        },
        login: function(user){
            return $http.post('/api/user/login/',user)
        }
    }

}]);