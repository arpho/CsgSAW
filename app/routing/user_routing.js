'use strict';
module.exports = {
    sendEmail : function(req,res){
        var body = req.body,Token = require('../utilities/tokenGenerator'),checkToken = Token.renewToken(body.token,body.email)
                ,schoolId = body._id,mongoose = require('mongoose');
                console.log('invio email token valido:',checkToken.valido)
                if(!checkToken.valido){

                    res.status(404).json({token:checkToken.token})
                }
                else{
                        var nodemailer = require('nodemailer'),
                        accountEmail = require('../../config/emailAccount'),
                        subject = body.subject,template = body.template,
                        receiver = body.receiver,mailOptions = {
                                                     from: accountEmail.account, // sender address
                                                     to: receiver, // list of receivers
                                                     subject: subject, // Subject line
                                                     //text: text //, // plaintext body
                                                      html: template // You can choose to send an HTML body instead
                                                 };
                    console.log(accountEmail)
                    var transporter =  nodemailer.createTransport({
                            service: 'Gmail',
                            auth: {
                                user: accountEmail.account, // Your email id
                                pass: accountEmail.password // Your password
                            }
                })
                    transporter.sendMail(mailOptions, function(error, info){
                        if(error){
                                console.log(error);
                                console.log('problemi')
                                res.status(404).json({yo: 'error',token:checkToken.token});
                            }else{
                                console.log('Message sent: ' + info.response);
                                res.json({yo: info.response,token:checkToken.token});
                            };
                    })
                }

    },
    crea: function(req,res) {
        var email = ""

        //creo il valore salt per l'utente
        var user = req.body
        console.log('creo utente', user)
        var crypto = require("crypto-js"),salt = crypto.lib.WordArray.random(128/8)

        console.log('caricato modello db')
        var key512Bits1000Iterations = crypto.PBKDF2(user.password, salt, { keySize: 512/32, iterations: 1000 });
        delete key512Bits1000Iterations.$super
        var userModel = require('../models/User')
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
    list: require('./routers/listUser'),
    trash: require('./routers/trashUser'),
    login: require('./routers/login'),
    retrieveUser : require('./routers/retrieveUser'),
    toBeEnabled: function(req,res){
    var token = req.body.token,
    email = req.body.email,
    user = require('../models/User'),
    Token = require('../utilities/tokenGenerator'),
    check = Token.renewToken(token,email)
    if(!check.valido) res.status(404).send('sessione scaduta')
    else{
    user.find({enabled:false},function(err,users){
        if (err) {
        res.status(404).send('errore del server')}
        else{
        var out = users.length >0
        res.send({users2BeEnabled:out,token:check.token})
        }
    })
    }

    }
}

