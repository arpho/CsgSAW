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
        trash: function(_id,token,email){
            /*
            ivia la richiesta al server per cancellare un'utente
            @param _id: String _id dell'utente da eliminare
            @param token: String token valido
            @param email: String email dell'utente che richiede l'azione
            @return promise della richiesta $http
            */
            var data = {_id:_id,token:token,email:email}
            return $http.post('/api/user/trash',data)
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
        update: function(user,token,email){
        /*
        invia la richiesta di update user al server
        @param: User: il modello utente che sarà inserito nel db
        @param: String token dell'utente che effettua la richiesta
        @param: String email dell'utente che effettua la richiesta
        */
        var data = {token:token,user:user,email:email}
            return $http.put('/api/user/update/',data)
        },
        setLogged : function(status){
            logged = status
        },
        hasRight : function(role){
            for(var i=o;i<=loggedUser.roles.length;i++){
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
        },
        generateDataPayload : function(){
            return {token:token,email:loggedUser.email}
        },
        getEmail : function(){
            return loggedUser.email;
        },
        list : function(data){
            return $http.post('/api/user/list/',data);
        },
        retrieveUser : function(payload){
            return $http.post('/api/user/retrieveUser/',payload)
        },
        gotPower : function(user,power){
                 /*
                 verifica che l'utente abbia l'autorizzazione richiesta
                 @param: user, utente da verificare
                 @param: String: permesso da verificare
                 @return Boolean: true se l'utente puo' esercitare tale funzione, false in caso negativo
                 */
                 if(user.roles){
                     for (var i = 0;i<user.roles.length;i++){
                        if(user.roles[i]==power) return true
                    }
                }
                return false
        },
        users2BeEnabled : function(data){
            return $http.post('/api/user/2BeEnabled/',data)
        }
    }
}]);