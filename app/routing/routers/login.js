'use strict';
module.exports = function(req,res){
        /*
        confronta i campi words delle due funzioni per verificare che siano uguali*/
    var user = req.body, checkPassword = function(pwd1,pwd2){
        if (pwd1.words === pwd2.words) return true
        var out = true
        for(var i = 0;i<pwd1.words.legth;i++)
        {
            out = out &&(pwd1.words[i] ==pwd2.words[i])
        }
        return out
    },
    userLogin = require('../../models/UserLogin'),
    userData = require('../../models/UserData'),
    crypto = require("crypto-js")
    console.log('richiesta di login',user)
    var authenticated
    userLogin.findOne({email:user.email}).populate('dataUser').exec(function(err,authenticatingUser){
        if(err){
        console.log(err)
        res.status(404).send(err)
        }
        var crypto = require("crypto-js"),
        hashed_password = crypto.PBKDF2(user.password, authenticatingUser.salt, { keySize: 512/32, iterations: 1000 }),
        authenticated = checkPassword(hashed_password,authenticatingUser.hashed_password)
        console.log('utente autenticato',authenticated)
        console.log('utente',authenticatingUser)
    })

    }
