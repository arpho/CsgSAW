'use strict';
module.exports = function(req,res){
var _id = req.body._id,token = req.body.token,email = req.body.email,
Token = require('../../utilities/tokenGenerator'),
User = require('../../models/User'),
 mongoose = require('mongoose'),
Cache = require('../../utilities/wrapperCache');
var _id = mongoose.Types.ObjectId(_id)
if(email!= Cache.retrieve(token))
{
    console.log('token not matching')
    res.status(404).send()
}
else{
    Cache.removeToken(token)
    token = Token.generateToken()
    Cache.setCache(token,email)
    var data = {status:'ok',token:token}
    User.remove({_id:_id},function(err,user){
        if(err){
            console.log(err)
            res.status(404).send()
        }
        console.log('found user', user)
        var data = {status:'ok',token:token,msg:'cancellato utente ' }
        res.send(data)
        console.log('done')
    })
    }
}
