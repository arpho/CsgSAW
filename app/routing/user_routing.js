'use strict';
module.exports = {

    crea: function(req,res) {
        var email = ""

        //creo il valore salt per l'utente
        var user = req.body
        console.log('creo utente', user)
        var crypto = require("crypto-js"),salt = crypto.lib.WordArray.random(128/8)
        var userModel = require('../models/User');
        console.log('caricato modello db')
        var key512Bits1000Iterations = crypto.PBKDF2(user.password, salt, { keySize: 512/32, iterations: 1000 });
        delete key512Bits1000Iterations.$super



        var User = new userModel({email:user.email,salt:salt,hashed_password:key512Bits1000Iterations,
        nome:user.nome,cognome:user.cognome,enabled:false});
        User.save(function(err,logUser){
            if(err) res.status(404).send(err);
            res.send({ok:true,msg:'utente creato'})
        })


        },



        //
        /*console.log('hashed password',key512Bits1000Iterations)
        res.send({msg:'ok',salt:salt,key512Bits1000Iterations})*/

    checkMail: function(req,res){
        var userLogin = require('../models/User')
        var query = req.body
        userLogin.find({query},function(err,emails){
        if (err){console.log('errore',err)}
        if(emails.length>0){
            res.json(emails) // mail usata no ok
        }
        else{
            res.status(404).send('Not Found') // risopondo  con un errore il client riterrà che la mail non è usata
        }
        })

    },
    update: require('./routers/updateUser'),

    login: require('./routers/login')
}

