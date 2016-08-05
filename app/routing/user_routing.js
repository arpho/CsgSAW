'use strict';
module.exports = {

    crea: function(req,res) {
        var email = ""
        console.log(req.query)
        //creo il valore salt per l'utente
        var crypto = require("crypto-js"),salt = crypto.lib.WordArray.random(128/8)
        res.send({msg:'done'})
        //key512Bits1000Iterations = crypto.PBKDF2(password, salt, { keySize: 512/32, iterations: 1000 });
        /*console.log('hashed password',key512Bits1000Iterations)
        res.send({msg:'ok',salt:salt,key512Bits1000Iterations})*/
    },
    checkMail: function(req,res){
        var userLogin = require('../models/UserLogin')
        var email = req.params.email.substring(1,req.params.email.length)
        console.log(req)
        console.log('checking mail: ',email)
        userLogin.find({'email':email},function(err,emails){
        if (err){console.log('errore',err)}
        if(emails.length>0){
            console.log(' mail found')
            res.json(emails) // mail usata no ok
        }
        else{
            console.log('mail not found');
            res.status(404).send('Not Found') // risopondo  con un errore il client riterrà che la mail non è usata
        }
        })

    }
}

