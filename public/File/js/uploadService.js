'use strict';
var loggedUser = {},token, logged = false;
angular.module('CsgSAW.services').factory('UploadService',['$http',function(flowFactoryProvider){
flowFactoryProvider.defaults = {
    target: '/api/upload',
    permanentErrors: [404, 500, 501],
    maxChunkRetries: 1,
    chunkRetryInterval: 5000,
    simultaneousUploads: 4
  };
  flowFactoryProvider.on('catchAll', function (event) {
    console.log('catchAll', arguments);
  })
}])

/**
 * The main app module
 * @name app
 * @type {angular.Module}
 */
var app = angular.module('CsgSAW.services', ['flow'])
.config(['flowFactoryProvider', function (flowFactoryProvider) {
  flowFactoryProvider.defaults = {
    target: '/api/upload/',
    permanentErrors: [404, 500, 501],
    maxChunkRetries: 1,
    chunkRetryInterval: 5000,
    simultaneousUploads: 4
  };
  flowFactoryProvider.on('catchAll', function (event) {
    console.log('catchAll', arguments);
  });
  // Can be used with different implementations of Flow.js
  // flowFactoryProvider.factory = fustyFlowFactory;
}]);