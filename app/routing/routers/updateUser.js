'use strict';
module.exports = function(req,res){
var user= req.body.user, mongoose = require('mongoose'),token = req.body.token,email = req.body.email;
var User = require('../../models/User'),
 Cache = require('../../utilities/wrapperCache.js'),
 Token = require('../../utilities/tokenGenerator');
var _id = mongoose.Types.ObjectId(user._id)
//console.log('user',user)
if(Cache.retrieve(token)==email){
    Cache.removeToken(token) //elimino il vecchio token
    token = Token.generateToken()
    Cache.setCache(token,email) // aggiorno il token in cache
    User.update({_id:_id},user,function(err,us){
    if(err){
    console.log(err)
    res.status(404).send()
    return
    }
    res.send({status:'ok',token:token})
    })
}
else{
console.log('token not matching')
res.status(404).send({msg:'sessione scaduta'});
}

}