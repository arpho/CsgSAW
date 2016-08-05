'use strict';
angular.module('CsgSAW.services').factory('UserService', ['$http', function($http) {
    return {
        create: function(user){
            console.log('creating',user)
            var data = {nome:user.nome,cognome:user.cognome,password:user.password,email:user.email}
               $http.post('/api/user/create/',data).then(function(a){console.log('user created',a)},function(b){
                console.log('problems',b)
               })
        }
    }

}]);