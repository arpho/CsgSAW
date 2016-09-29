'use strict';
var randtoken = require('rand-token'),
generateToken = function(){
                        return randtoken.generate(128)
                },
renewToken = function(oldToken,email){
    var  Cache = require('./wrapperCache');
     //Token = require('../../utilities/tokenGenerator');
     console.log('oldtoken',oldToken,Cache.retrieve(oldToken))
     if(email!= Cache.retrieve(oldToken)||!oldToken) return {valido:false};
     else{
        //token valido lo rinnovo
         Cache.removeToken(oldToken)
         var newToken = generateToken()
         Cache.setCache(newToken,email)
         return{valido:true,token:newToken}
     }
}
module.exports = {
    generateToken: generateToken
    , renewToken: renewToken
    }
