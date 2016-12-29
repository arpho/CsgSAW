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
retrievePath:function(callback){
    config.find({label:'path'},function(err,config){
    console.log('path: ',config)
        callback(err,config)
    })
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
        },
path:
function(req,res){
    var token = req.body.token,
            email = req.body.email, Token = require('../utilities/tokenGenerator'),
            Path = req.body.path||'/',
            checked = Token.renewToken(token,email);
            console.log('richiesto path: ',Path)
            if(!checked.valido){
                                            console.log('config.update sessione scaduta')
                                            res.status(404).send('errore')
                                        }
                    else{
                        console.log('path token valido')
                        var fs = require('fs'),  out = [], async = require('async')
                        fs.readdir(Path,(err,data)=>{
                        	if(err){
                        	 console.log(err)
                        	  throw err;
                        	}

                        	async.each(data,(item,done)=>{
                                                    		fs.stat(Path+item,(err,stats) =>{
                                                    			if(err) {
                                                    				res.status(404).send()
                                                    				done(err)
                                                    			}
                                                    			out.push({label:item,value:item,path:Path+item,children:stats.isDirectory()?[{label:''}]:null,selected:false})
                                                    			done()
                                                    		})
                                                    	},
                                                    		(err,results) =>{  // callback di async.each)
                                                    			res.json({token:checked.token,data:out})
                                                    		})
                        	})


                        }
                    }
}

