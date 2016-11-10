'use strict';
 var config = require('../models/Config'),multer = require('multer');

 module.exports = {
    upload : function(req,res){
    console.log('uploading',req.files,'files')
    var formidable = require('formidable'),
    form = new formidable.IncomingForm();
     var token = req.body.token,
            email = req.body.email, Token = require('../utilities/tokenGenerator'),
upload_destination


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
         form.parse(req,function(err, fields, files){
         console.log('err:',err)
         console.log('fields:',fields)
         //console.log('files:',files)
         var checked = Token.renewToken(fields.token,fields.email)
                     console.log(checked)
         });
        //res.send(config)

        })
 }
 }