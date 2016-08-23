'use strict';
angular.module('csgSAW.controllers').controller('ProfileController',['$scope','UserService',
'$mdDialog','app-messages','$mdMedia','$rootScope','RoleService',function($scope,Users,$mdDialog,messages,$mdMedia,$rootScope,Roles){
    $scope.user = Users.getLoggedUser();
    $scope.title = Users.getNome()? 'Ciao '+ Users.getNome() : 'Ciao'
    $scope.tagline = 'gestisci il tuo profilo utente'
    $rootScope.$on('updatedAddress', function(ev,args){
        console.log(' updated address', args)
    })
    $rootScope.$on('addedAddress',function(ev,args){
        $scope.user.address = $scope.user.address ||[];
        $scope.user.address.push(args)
        $mdDialog.hide();
    })
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

    })
    $scope.onlyWeekendsPredicate = function(date) {
        var day = date.getDay();
        return day === 0 || day === 6;
      }

     $scope.showPower = function(role,user){
        if(role!='superadmin') return true
        if((role=='superadmin') && $scope.gotPower(user,'superadmin')) return true
        return false
     }
     $scope.filterPower = function(user){
     return function(power){
        return $scope.gotPower(user,power)
     }
     }
     $scope.addAddress = function(ev){
         var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                     $mdDialog.show({
                         controller: 'AddAddressController',
                         controllerAs: 'ctrl',
                         templateUrl: 'User/AddressPopup.html',
                         parent: angular.element(document.body),
                         targetEvent: ev,
                         clickOutsideToClose: false,
                         fullScreen: useFullScreen
                      })
     }
     $scope.addTelephone = function(ev){
         console.log('adding telephone',ev)
     }

     $scope.submit = function(){
        Users.update($scope.user,Users.getToken(),Users.getEmail()).then(function(data){
            Users.setToken(data.data.token) //aggiorno il token
            var msg ='utente aggiornato correttamente'
            $mdDialog.show(
                                                   $mdDialog.alert()
                                                     .parent(angular.element(document.querySelector('#popupContainer')))
                                                     .clickOutsideToClose(true)
                                                     .title('profilo utente aggiornato')
                                                     .textContent(msg)
                                                     .ariaLabel('')
                                                     .ok('Ok')
                                                 ).then(function(){
                                                    $rootScope.$emit('updatedUser')
                                                 });

        }).catch(function(data){
                            Users.setToken(data.data.token) //aggiorno il token
                            var msg ='OPs, loggati nuovamente e riprova'
                            $mdDialog.show(
                                                                   $mdDialog.alert()
                                                                     .parent(angular.element(document.querySelector('#popupContainer')))
                                                                     .clickOutsideToClose(true)
                                                                     .title('Profilo utente non aggiornato')
                                                                     .textContent(msg)
                                                                     .ariaLabel('')
                                                                     .ok('Ok')
                                                                 ).then(function(){
                                                                    $rootScope.$emit('updatedUser')
                                                                 });

                        })
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
   $scope.roles = res.data;
   })
    $scope.updateAddress = function(ev,index){
        console.log('updating address', index,' ', $scope.user.address[index])
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                             $mdDialog.show({
                                 controller: 'UpdateAddressController',
                                 controllerAs: 'ctrl',
                                 templateUrl: 'User/AddressPopup.html',
                                 parent: angular.element(document.body),
                                 targetEvent: ev,
                                 clickOutsideToClose: false,
                                 fullScreen: useFullScreen
                              })
        var args = {address:$scope.user.address[index],index:index}
        messages.putMessage('updateAddress',args)
    }
    $scope.removeAddress = function(index){
        delete $scope.user.address[index]
    }

   $scope.gotPower = function(user,power){
        return Users.gotPower(user,power)
   }
}]).controller('AddAddressController',['$scope','$rootScope','$mdDialog',function($scope,$rootScope,$mdDialog){
       $scope.title = 'nuovo indirizzo'
       $scope.azione = 'aggiungi'
       $scope.address = {}
       $scope.cancel = function(){
           $mdDialog.hide()
       }
       $scope.submit = function(address){
           $rootScope.$emit('addedAddress',address);
       }
   }]).controller('UpdateAddressController',['$scope','$rootScope','$mdDialog','app-messages',function($scope,$rootScope,$mdDialog,messages){
          $scope.title = 'modifica indirizzo'
          $scope.azione = 'modifica'
          $scope.address = {}
          var index,args = messages.getMessage('updateAddress'),
            index  = args.index;
            $scope.address = args.address;

          $scope.cancel = function(){
              $mdDialog.hide()
          }
          $scope.submit = function(address){
              $rootScope.$emit('updatedAddress',address,index);
              $mdDialog.hide()
          }
      }])
