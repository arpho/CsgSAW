'use strict';
module.exports = function(req,res){
var user= req.body.user, mongoose = require('mongoose'),token = req.body.token;
var User = require('../../models/User'),
 Cache = require('../../utilities/wrapperCache.js'),
 Token = require('../../utilities/tokenGenerator');
var _id = mongoose.Types.ObjectId(user._id)
console.log('token ricevuto:',token)
//console.log('user',user)
console.log('cache per token',Cache.retrieve(token));
if(Cache.retrieve(token)==user.email){
    console.log('token verificato')
    Cache.removeToken(token) //elimino il vecchio token
    token = Token.generateToken()
    Cache.setCache(token,user.email) // aggiorno il token in cache
    User.update({_id:_id},user,function(err,us){
    if(err){
    res.status(404).send()
    return
    }
    res.send({status:'ok',token:token})
    console.log('user updated')
    })
}
else{

}

}