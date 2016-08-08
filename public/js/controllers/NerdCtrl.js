angular.module('csgSAW.controllers').controller('NerdController',['$scope','$mdDialog','$mdMedia','$mdToast','app-messages',
  function($scope,$mdDialog,$mdMedia, $mdToast,messages) {

    $scope.tagline = 'Nothing beats a pocket protector!';
    messages.putMessage('toastTitle','Test');
    messages.putMessage('toastBody','questo è un toast test')

    $scope.showAlert = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('This is an alert title')
            .textContent('You can specify some description text in here.')
            .ariaLabel('Alert Dialog Demo')
            .ok('Got it!')
            .targetEvent(ev)
        );
      };

    $scope.showCustomToast = function() {
            $mdToast.show({
              hideDelay   : 3000,
              position    : 'top right',
              controller  : 'ToastCtrl',
              templateUrl : 'views/toast-template.html'
            });
          };

    $scope.closeToast = function() {
            if (isDlgOpen) return;
            $mdToast
              .hide()
              .then(function() {
                isDlgOpen = false;
              });
          };


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
    $scope.login = function(ev){
                               var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                               $mdDialog.show({
                                   controller: 'LoginController',
                                   controllerAs: 'ctrl',
                                   templateUrl: 'User/loginPopup.html',
                                   parent: angular.element(document.body),
                                   targetEvent: ev,
                                   clickOutsideToClose: true,
                                   fullScreen: useFullScreen
                                })
                       }

}]).controller('ToastCtrl',['$scope','$mdToast','$mdDialog','app-messages', function($scope, $mdToast, $mdDialog,messages) {
        console.log(messages)
        $scope.title = messages.getMessage('titleToast')
        $scope.message = messages.getMessage('toastBody')
         $scope.closeToast = function() {
           if (isDlgOpen) return;
           $mdToast
             .hide()
             .then(function() {
               isDlgOpen = false;
             });
         }
         }]
         );
