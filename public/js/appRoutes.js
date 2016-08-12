angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        .when('/nerds', {
            templateUrl: 'views/nerd.html',
            controller: 'NerdController'
        })

        .when('/geeks', {
            templateUrl: 'views/geek.html',
            controller: 'GeekController'    
        })
        .when('/profile',{
            templateUrl:'User/profile.html',
            controller:'ProfileController'
        })
        .when('/listUsers',{
            templateUrl:'User/UserList.html',
            controller:'UserListController'
        })

    $locationProvider.html5Mode(true);

}]);