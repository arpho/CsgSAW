'use static';
var accountEmail= {}, async = require('async'),Configs = require('../models/Config'), mongoose       = require('mongoose'),db = require('../../config/db');
var retrieveAccount = function(done){
                    Configs.findOne({label:  "accountEmail"},function(err,account){
                        console.log('accountMail',account)
                        if(err){
                        console.log(err)
                        done(err)
                        }
                        done(null,account.actualValue)
                    })
                    },retrievePassword = function(done){
                    Configs.findOne({label:  "passwordEmail"},function(err,email){
                                                console.log('passwordEmail',email)
                                            if(err){
                                            console.log(err)
                                            done(err)
                                            }
                                            done(null,email.actualValue)
                                        })
                    }
, functions = [retrieveAccount,retrievePassword]
 mongoose.connect(db.url);
console.log('starting async')
async.series(functions,function(err,results){
                    accountEmail.account = results[0]
                    accountEmail.password = results[1]
                    console.log(accountEmail)
                    })
console.log('done')