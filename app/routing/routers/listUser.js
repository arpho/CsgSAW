'use strict';
module.exports = function(req,res){
var email = req.body.email,
 token = req.body.token,
 Cache = require('../../utilities/wrapperCache'),
 Token = require('../../utilities/tokenGenerator');
if(email==Cache.retrieve(token)){
    Cache.removeToken(token)
    token = Token.generateToken();
    Cache.setCache(token,email)
    var User = require('../../models/User')
    User.find({},function(err,users){
        if(err){
            console.err(err)
            res.status(404).send()
        }
        res.json({status:'ok',users:users,token:token})
    })
}
else{
    console.log('listusers token no ok')
}

}