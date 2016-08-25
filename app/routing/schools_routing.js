'use strict';
 var schoolModel = require('../models/School');
 module.exports = {
    list: function( req,res){
    console.log('school list')
    var token = req.body.token,
    email = req.body.email, Token = require('../utilities/tokenGenerator'),
    checked = Token.renewToken(token,email)
    if(!checked.valido){
        console.log('sessione scaduta')
        res.status(404).send('errore')
    }
    else{

    schoolModel.find({}, function(err,scholls){
    if(err){
        console.log(err)
        res.status(404).send({msg:'errore del server'})
    }
    res.json({msg:'ok',data: scholls,token:checked.token})
   })
    }
    },
    crea: function(req,res){
        var school = req.body;
        Scholl = new schoolModel(school)
         School.save(function(err,data){
            if(err){
                res.status(404).send({msg:'errore del server'})
            }
            res.send({status:'ok',msg:'scuola inserita correttamente',data: data})
         })
    }
 }