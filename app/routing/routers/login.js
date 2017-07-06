'use strict';
module.exports = function(req,res){
        /*
        confronta i campi words delle due funzioni per verificare che siano uguali*/
    var user = req.body, checkPassword = function(pwd1,pwd2){
        if (pwd1.words === pwd2.words) return true
        var out = true
        for(var i = 0;i<pwd1.words.length;i++)
        {
            out = out &&(pwd1.words[i] ==pwd2.words[i])
        }
        return out
    },
    userLogin = require('../../models/User'),
    crypto = require("crypto-js")

    var authenticated, tokenGenerator = require('../../utilities/tokenGenerator'), cache = require('../../utilities/wrapperCache')
    userLogin.findOne({email:user.email,enabled:true},function(err,authenticatingUser){
        if(err ||!authenticatingUser){
        res.status(404).send()
        return
        }
        var crypto = require("crypto-js"),
        hashed_password = crypto.PBKDF2(user.password, authenticatingUser.salt, { keySize: 512/32, iterations: 1000 }),
        authenticated = checkPassword(hashed_password,authenticatingUser.hashed_password)
        delete authenticatingUser.hashed_password
        delete authenticatingUser.salt
        if(!authenticated) {
        res.status(404).send({msg:'utente non autorizzato'})}
        else  {
            var token = tokenGenerator.generateToken();
            cache.setCache(token,authenticatingUser.email)
            res.send({authenticated:authenticated,authenticatingUser:authenticatingUser,token:token})
        }

    })

    }
