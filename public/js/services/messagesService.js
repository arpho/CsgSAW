angular.module('CsgSAW.services').factory('app-messages', [ function($http) {

    var  messages = {};
    return {
        putMessage : function(key,msg){
        /*
        inserisce un nuovo messaggio
        @param key: String chiave del messaggio
        @param msg: corpo del messaggio
        */
            messages[key] = msg
        },
        getMessage : function(key){
            /* ritorna il messaggio associato alla chiave
                @param key: String chiave del messaggio
                @return String
            */
            return messages[key]
        }
    }

}]);