'use strict';
angular.module('CsgSAW.directives',[]).directive('isMailAvailable', function(isEmailAvailable) {
                                     return {
                                       restrict: 'A',
                                       require: 'ngModel',
                                       link: function(scope, element, attrs, ngModel) {
                                         ngModel.$asyncValidators.unique = isEmailAvailable;
                                       }
                                     };
                                   });