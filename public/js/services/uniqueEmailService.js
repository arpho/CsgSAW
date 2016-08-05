'use strict';
angular.module('CsgSAW.services').factory('UniqueMail', ['$q','$http', function($q,$http) {

    return  function(email){
        var deferred = $q.defer();
        $http.post('/api/user/mail:'+email).then(function(ris){
        //found mail
        console.log('rejected: mail usata',ris)
            deferred.reject();
        }, function(ris){

        // mail not found
        console.log('ok mail libera')
        console.log(ris)
                    deferred.resolve();
        });
        return deferred.promise;
    }

}]);