'use strict';
var  multer = require('multer'), path = require('path'),nome_upload,ffmetadata = require('ffmetadata'),async = require('async');

var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            nome_upload = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
            console.log('filename', file)
            console.log('nome upload: ',file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
            console.log('fields',req.fields)
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        }
    });
    var retrievePath = require('./configs_routing').retrievePath,
    upload = multer({ //multer settings
                        storage: storage
                    }).single('registrazione');
 var config = require('../models/Config'),
upload_destination = path.join(__dirname, '/uploads')
//,upload = multer({dest:upload_destination})
 //var upload = multer({ dest: upload_destination })
 module.exports = {
    upload : function(req,res){
    //console.log(req,'req')
    upload(req,res,function(err){
                              if(err){
                                   res.json({error_code:1,err_desc:err});
                                   return;
                              }
                               //res.json({error_code:0,err_desc:null});
                               console.log('upload ok')
                               console.log('uploading files1')
                               var fs = require('fs'),formidable = require('formidable'),
                               form = new formidable.IncomingForm();
                               console.log('parsing form')
                               form.parse(req,function(err, fields, files){
                                console.log('form parsed 38')
                                   console.log('err:',err)
                                   console.log('fields39: ',fields)
                                   console.log('tags 40: ',fields.tags)
                                   console.log('files:',files)

                                   //console.log('token ok',checked.valido)
                               });

                          })
    console.log('uploading files')
    var fs = require('fs'),formidable = require('formidable'),
    form = new formidable.IncomingForm();

    //console.log(req.files,'file2upload','.')
     var token,
            email, Token = require('../utilities/tokenGenerator'), fs = require("fs");

    console.log('tokengenerator')
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
        console.log('config.find',storage)
    form.on('registrazione', function(field, file) {
        console.log("file uploaded")
        fs.rename(file.path, path.join(form.uploadDir, file.name));
      });
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
      });
       // var upload = multer({storage: storage}).single('photo');
        console.log('parsing req',err)
         form.parse(req,function(err, fields, files){
         console.log('err:',err)
         console.log('fields79: ',fields)
         var checked = Token.renewToken(fields.token,fields.email)
         console.log('token valido:',checked.valido)
         console.log(nome_upload,'esiste: ',fs.existsSync('./uploads/'+nome_upload))
         var setTags = function(data2pass,callback){ //wrapper di tagFacility.write
                            var tags = {}
                            require('../utilities/tagFacility').write('./uploads/'+nome_upload,tags,function(err,data){
                                callback(err,data2pass)
                            })
                        }

         });
        //res.send(config)

        })
 }
 }