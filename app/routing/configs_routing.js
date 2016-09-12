'use strict';
 var config = require('../models/Config');
module.exports = {
    list : function(req,res){
    var token = req.body.token,
        email = req.body.email, Token = require('../utilities/tokenGenerator'),
        checked = Token.renewToken(token,email)
        if(!checked.valido){
                console.log('config.list sessione scaduta')
                res.status(404).send('errore')
            }
            else{
                    config.find({},function(err,configs){
                        if(err){
                        res.status(404).send(err);
                        }
                        else{
                        res.json({configs,configs,token:checked.token})
                        }
                    })
        }

},
retrieve: function(req,res){
    var token = req.body.token,
        email = req.body.email, Token = require('../utilities/tokenGenerator'),
        label = req.body.config,
        checked = Token.renewToken(token,email)
                if(!checked.valido){
                        console.log('config.retrieve sessione scaduta')
                        res.status(404).send('errore')
                    }
                    else{
                        config.find({label:label},function(err,config){
                            if(err){
                                console.err(err)
                                res.status(404).send()
                            }
                            var out = {data:config,token:checked.token}
                            res.json(out)

                        })
                    }
},
update: function(req,res){
    var token = req.body.token,
        email = req.body.email, Token = require('../utilities/tokenGenerator'),
        newConfig = req.body.config,
        checked = Token.renewToken(token,email);
        if(!checked.valido){
                                console.log('config.update sessione scaduta')
                                res.status(404).send('errore')
                            }
        else{
            config.findOneAndUpdate({label:newConfig.label},newConfig,{upsert:true},function(err,config){
                if(err){
                    console.err(err)
                    res.status(404).send()
                }
                else{
                        var out = {ok:true,msg:'configurazione aggiornata',token:checked.token}
                        res.json(out)
                }
            })}
        }
}
