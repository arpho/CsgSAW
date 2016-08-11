'use strict';
angular.module('csgSAW.controllers').controller('ProfileController',['$scope','UserService',
'$mdDialog','app-messages','$mdMedia','$rootScope','RoleService',function($scope,Users,$mdDialog,messages,$mdMedia,$rootScope,Roles){
    $scope.user = Users.getLoggedUser();
    $scope.title = Users.getNome()? 'Ciao '+ Users.getNome() : 'Ciao'
    $scope.tagline = 'gestisci il tuo profilo utente'
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
    $scope.addAuthorization = function(power){
        $scope.user.roles.push(power);
    }

    $scope.removeAuthorization = function(power){
    $scope.user.roles.forEach(function(item,index){
        if(item == power)
        delete $scope.user.roles[index]
    })
    }
    $rootScope.$on('loggedUser',function(ev,args){
        $scope.user = Users.getLoggedUser();
        $scope.title ="Ciao " + Users.getNome()
        $scope.user.dob = new Date($scope.user.dob);
    console.log("autorizzazioni dell'utente",$scope.user.roles)
    })
    $scope.onlyWeekendsPredicate = function(date) {
        var day = date.getDay();
        return day === 0 || day === 6;
      }
     $scope.submit = function(){
        console.log('updating',$scope.user)
        //TODO: INVIARE TOKEN AL SERVER
        Users.update($scope.user)
     }
    $scope.user = Users.getLoggedUser();
    $scope.user.dob = new Date($scope.user.dob);
   if(!Users.isLogged()){
    $scope.login();
   }
   $scope.SiNo = function(b){
    return b? 'si':'no'
   }
   Roles.list().then(function(res){
        console.log('roles',res.data)
   $scope.roles = res.data;
   })

   $scope.gotPower = function(user,power){
        return Users.gotPower(user,power)
   }
}])
