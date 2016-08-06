'use strict';
module.exports = {

    crea: function(req,res) {
        var email = ""

        //creo il valore salt per l'utente
        var user = req.body
        var ObjectID = require('mongodb').ObjectID;
        var crypto = require("crypto-js"),salt = crypto.lib.WordArray.random(128/8)
        var userLogin = require('../models/UserLogin'), UserData = require('../models/UserData'),

        key512Bits1000Iterations = crypto.PBKDF2(user.password, salt, { keySize: 512/32, iterations: 1000 });
        delete key512Bits1000Iterations.$super
        var newUser = new userLogin({email:user.email,salt:salt,hashed_password:key512Bits1000Iterations,enabled:false,_id:new ObjectID}),
        userInfo = new UserData({nome:user.nome,cognome:user.cognome,user_Id:newUser._id})
        var tasks = []; //uso async parallel per eseguire i due inserimenti in parallelo
        tasks.push(function(callback){ // newUser.save
            newUser.save(function(err){
                        callback(err)
                    })
        })

        tasks.push(function(callback){ // userInfo.save
            userInfo.save(function(err){
                callback(err)
            })
        })
        var async = require('async')
        async.parallel(tasks,function done(err,result){
            if(err){
                res.send({ok:false,err:err})
                throw err;

            }
            res.send({ok:true,messsge:'utente creato'})
        })
        },



        //
        /*console.log('hashed password',key512Bits1000Iterations)
        res.send({msg:'ok',salt:salt,key512Bits1000Iterations})*/

    checkMail: function(req,res){
        var userLogin = require('../models/UserLogin')
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

    }
}

