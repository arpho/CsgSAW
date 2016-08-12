'use strict';
module.exports = function(req,res){
var email = req.body.email,
 token = req.body.token,
 Cache = require('../../utilities/wrapperCache'),
 Token = require('../../utilities/tokenGenerator');
console.log(req.params)
console.log('token:',token)
console.log('email:',email)
if(email==Cache.retrieve(token)){
    console.log('token ok')
    Cache.removeToken(token)
    console.log('cancellato vecchio token')
    token = Token.generateToken();
    Cache.setCache(token,email)
    console.log('settato in cache nuovo token')
    var User = require('../../models/User')
    User.find({},function(err,users){
        if(err){
            console.err(err)
            res.status(404).send()
        }
        console.log('ottenuto elenco utenti',users.length)
        console.log('risposta al client',{status:'ok',users:users,token:token})
        res.json({status:'ok',users:users,token:token})
    })
}
else{
    console.log('token no ok')
}

}