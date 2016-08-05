'use strict';
angular.module('CsgSAW.directives',[]).directive('uniqueMail', function(UniqueMail) {
                                     return {
                                       restrict: 'A',
                                       require: 'ngModel',
                                       link: function(scope, element, attrs, ngModel) {
                                         ngModel.$asyncValidators.unique = UniqueMail;
                                       }
                                     };
                                   });