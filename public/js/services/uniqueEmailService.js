'use strict';
angular.module('CsgSAW.services').factory('isMailAvailable', ['$q','$http', function($q,$http) {

    return  function(email){
        var deferred = $q.defer();
        $http.post('/api/user/mail:'+email).then(function(){
        //found mail
        console.log('rejected')
            deferred.reject();
        }, function(){

        // mail not found
        console.log('ok mail libera')
                    deferred.resolve();
        });
        return deferred.promise;
    }

}]);