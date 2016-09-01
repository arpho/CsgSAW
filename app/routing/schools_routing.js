'use strict';
 var schoolModel = require('../models/School');
 module.exports = {
    list: function( req,res){
    var token = req.body.token,
    email = req.body.email, Token = require('../utilities/tokenGenerator'),
    checked = Token.renewToken(token,email)
    if(!checked.valido){
        console.log('school.list sessione scaduta')
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
    update: function(req,res){
        var body = req.body,Token = require('../utilities/tokenGenerator'),checkToken = Token.renewToken(body.token,body.email)
                ,school = body.school,mongoose = require('mongoose');
                console.log('updating school',school)
                if(checkToken.valido){
                    console.log('token valido')
                    var _id = mongoose.Types.ObjectId(school._id)
                    schoolModel.update({_id:_id},school,function(err,school){
                    if(err){
                        console.err('update school errore',err)
                        res.status(404).send({token:checkToken.token})
                    }
                    var out = {token:checkToken.token,school:school}
                    res.json(out)
                    })
                }
                else{
                     console.log('update school token scaduto')
                     res.status(404).send()
                }
    },
    trash: function(req,res){
        var body = req.body,Token = require('../utilities/tokenGenerator'),checkToken = Token.renewToken(body.token,body.email)
        ,schoolId = body._id,mongoose = require('mongoose');
        console.log('cancellare scuola',checkToken.valido)
        if(checkToken.valido){
            schoolModel.remove({_id:mongoose.Types.ObjectId(schoolId)},function(err,school){
                if(err){
                    console.err('errore',err)
                    res.status(404).send({token:checkToken.token})
                }
                var out = {ok:true,token:checkToken.token,school:school}
                res.json(out)
            })
        }
        else{
            console.log('trash school token non valido')
            res.status(404).send()
        }
    },
    crea: function(req,res){
        var school = req.body,Token = require('../utilities/tokenGenerator'),checkToken = Token.renewToken(school.token,school.email);
        console.log('creando')
        if(checkToken.valido){
         console.log('token ok')
         var School = new schoolModel(school.school)
         School.save(function(err,esito){
            console.log('scuola salvata',esito)
            console.log('errore',err)
            res.json({ok:true,school:esito,token:checkToken.token})
         })

         }
         else{
              console.log('token scaduto')
        }

    }
 }