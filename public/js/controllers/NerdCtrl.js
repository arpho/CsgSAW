angular.module('csgSAW.controllers').controller('NerdController',['$scope','$mdDialog','$mdMedia',  function($scope,$mdDialog,$mdMedia) {

    $scope.tagline = 'Nothing beats a pocket protector!';


    $scope.register = function(ev){
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: 'UserController',
                controllerAs: 'ctrl',
                templateUrl: 'User/RegisteringPopup.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullScreen: useFullScreen
             })
    }

}]);