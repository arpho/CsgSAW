angular.module('CsgSAW.services',['ngCookies']).factory('CookiesService', [ '$cookies', function (
    Cookies) {
	return {
		put:(key,value,options) => {
		Cookies.putObject(key,value,options)
	},
	get: (key,deserialize) =>{
		/*
		legge il cui con chiave key
		@param key: string chiave del cookie
		@param deserialize: boolean se settato ritorna un oggetto javascript altrimenti
		 l'oggetto serializzato
		  @return object javascript  se deserialize è settato oppure una stringa
		*/
		if(deserialize){
			return JSON.parse(Cookies.get(key))
		}
		else{
			return Cookies.get(key)
		}
	},
	remove: (key) =>{
		Cookies.remove(key);
	}
}
}
])
