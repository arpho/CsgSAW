'use strict';
var loggedUser = {},token, logged = false;
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
        },
        setLoggedUser : function(user){
        loggedUser = user
        },
        getNome : function(){
        return loggedUser.nome},
        getCognome : function(){
        return loggedUser.cognome},
        getToken: function(){
             return token
        },
        setLogged : function(status){
            logged = status
        },
        hasRight : function(role){
            for(var i=o;i<loggedUser.roles.length;i++){
                if(role ==loggedUser.roles[i]) return true// se l'utente gode del diritto richiesto ritornsa true
            }
            return false;// l'utente non gode di tale diritto
        },
        setToken: function(newToken){
            token = newToken
        },
        isLogged : function() {
            return logged;
        },
        getLoggedUser : function(){
            return loggedUser;
        }

    }

}]);