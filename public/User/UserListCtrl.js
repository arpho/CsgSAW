'use strict';
angular.module('csgSAW.controllers').controller('UserListController',['$scope','UserService','$mdMedia','$mdDialog',
'app-messages', '$cookies',  '$window','$rootScope','$mdToast','SchoolService',function($scope,Users,$mdMedia,$mdDialog,messages, $cookies,
 $window,$rootScope,$mdToast,Schools){
    $scope.userDetail = function(ev,user){
        console.log('dettaglio utente',user)
        messages.putMessage('userDetail',user) // passo l'utente al controller del popup di dettaglio
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
         $mdDialog.show({
                                                    controller: 'userDetailController',
                                                    controllerAs: 'ctrl',
                                                    templateUrl: 'User/views/userDetail.html',
                                                    parent: angular.element(document.body),
                                                    targetEvent: ev,
                                                    clickOutsideToClose: false,
                                                    fullScreen: useFullScreen
                                                 })
    }
    $scope.sendMessage = function(user){
        console.log('sending message to', user.email)
        var body = Users.generateDataPayload()
        body.receiver = user.email
        body.subject = 'test'
        body.template = '<b>Hello world ✔</b>'
        Users.sendEmail(body).then(function(info){ //TODO completare con un popup per aggiungere testo e oggetto della mail nonchè un bel template
            console.log('email info ',info)
            Users.setToken(info.data.token)
         $mdToast.show(
            $mdToast.simple()
            .textContent("è stata spedita una mail a "+ user.nome+ " all'indirizzo "+ user.email)
            .position('top right')
            .hideDelay(3000)
         );
        }).catch(function(info){
        Users.setToken(info.data.token)
                 $mdToast.show(
                    $mdToast.simple()
                    .textContent("sono stati riscontrati problemi")
                    .position('top right')
                    .hideDelay(3000)
                 );
        })
    }

     var  initialize = function(){
     var data = Users.generateDataPayload();
          console.log('inizializzo il controller')
        Users.list(data).then(function(data){
                    $scope.users = data.data.users;
                    Users.setToken(data.data.token)
                    var body = Users.generateDataPayload()
                    console.log('userlistctrl')
                    Schools.list(body).then(function(info){
                    $scope.schools = info.data.data
                    console.log('schools',$scope.schools)
                    console.log('token dalle scuole ',info.data.token)
                    Users.setToken(info.data.token)
                    }).catch(function(info){
                    console.log('errore',info)
                    })
                 });
     }
      $rootScope.$on('loggedUser',function(ev,args){
        initialize()
      })
     if(Users.isLogged()){
        console.log('utente loggato')
         initialize()
     }
     else{
        console.log('utente non loggato')
        $scope.login();
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
         $scope.search = true;
         $scope.enableUser = function(user){
         user.enabled = true;
         Users.update(user,Users.getToken(),Users.getEmail()).then(function(res){
         Users.setToken(res.data.token)
         $mdToast.show(
            $mdToast.simple()
            .textContent(user.nome+" è stato abilitato")
            .position('top right')
            .hideDelay(3000)
         );

         }).catch(function(res){
            $mdToast.show(
                  $mdToast.simple()
                    .textContent('problemi')
                    .position('top right')
                    .hideDelay(3000)
            )
         })
         }

    $scope.trashUser = function(user){
        var confirm = $mdDialog.confirm()
                  .title('cancellazione utente')
                  .textContent('vuoi veramente cancellare '+user.email+" ?")
                  .ariaLabel('sei sicuro?')
                  .ok('Si rimuovilo')
                  .cancel('No, lo perdono');
        $mdDialog.show(confirm).then(function(){
            Users.trash(user._id,Users.getToken(),Users.getEmail()).then(function(res){
                Users.setToken(res.data.token)
            })
        },function(){
        })
    }
    $scope.$on('openDetail',function(ev,args){
    console.log('aprire dettaglio')
    })

     $rootScope.$on('loggedUser',function(ev,args){
             $scope.user = Users.getLoggedUser();
             $scope.title ="Ciao " + Users.getNome()
             $scope.user.dob = new Date($scope.user.dob);
     var data = {token:Users.getToken(),email:Users.getEmail()}


     });
}]).filter('AbilitatiSiNo',function(){
    return function(value){
        return value? 'abilitati':'non abilitati'
    }
}).filter('sedeScuola',function(){
        return function(input, schools){
            for(var i=0;i<schools.length;i++){
                if (input == schools[i]._id) return schools[i].sede
            }
        }
})