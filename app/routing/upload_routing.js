'use strict';
 var config = require('../models/Config'),multer = require('multer');

 module.exports = {
    upload : function(req,res){
    console.log('uploading')

     var token = req.body.token,
            email = req.body.email, Token = require('../utilities/tokenGenerator'),
            checked = Token.renewToken(token,email)
            console.log(checked)
            if(!checked.valido){
                            console.log('config.list sessione scaduta')
                            res.status(404).send('errore')
                        }

    var upload_destination
    config.find({label:'path'}, function(err,config){
        upload_destination = config
        var storage = multer.diskStorage({
          destination: function (request, file, callback) {
            callback(null, storage);
          },
          filename: function (request, file, callback) {
            console.log(file);
            callback(null, file.originalname)
          }
        });
        var upload = multer({storage: storage}).single('photo');

        res.send(config)

        })
 }
 }