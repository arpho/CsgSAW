'use strict';

module.exports = function(req,res){
    console.log('retrieve user')
    var Token = require('../../utilities/tokenGenerator'),
    body = req.body,
    payload = Token.renewToken(body.token,body.email)
    console.log('check token',payload)
    if(!payload.valido){
        console.log('retrieveUSer token non valido')
        res.status(404).send({msg:'sessione scaduta'})
    }
    else{
        var User = require('../../models/User'),mongoose = require('mongoose')
        User.find({_id:mongoose.Types.ObjectId(body.user)},function(err,user){
            if(err){
                console.err(err)
                res.status(404).send()
            }
            else{
                payload.user = user
                console.log('found user',user)
                res.json(payload)
            }
        })
    }


}