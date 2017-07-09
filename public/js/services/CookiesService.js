angular.module('CsgSAW.services',['ngCookies']).factory('CookiesService', [ '$cookies', function (
    Cookies) {
	return {
		put:(key,value,options) => {
		Cookies.putObject(key,value,options)
	},
	get: (key) =>{
		return Cookies.get(key)
	}
}
}
])
