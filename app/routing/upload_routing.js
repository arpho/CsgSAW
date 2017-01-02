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
    var storage = multer.diskStorage({
              destination: function (request, file, callback) {
                callback(null, storage);
              },
              filename: function (request, file, callback) {
                console.log(file);
                callback(null, file.originalname)
              }
            });
form.on('registrazione', function(field, file) {
        console.log("file uploaded")
        fs.rename(file.path, path.join(form.uploadDir, file.name));
      });
form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
      });
         form.parse(req,function(err, fields, files){
         console.log('err:',err)
         console.log('fields79: ',fields)
         var checked = Token.renewToken(fields.token,fields.email)
         console.log('token valido:',checked.valido)
         console.log(nome_upload,'esiste: ',fs.existsSync('./uploads/'+nome_upload))
         var setTags = function(data2pass,callback){ //wrapper di tagFacility.write
                            console.log('settags',data2pass)
                            var tags = {};

                            tags.titolo = fields.nomeFile
                            tags.artista = fields.relatore
                            tags.album = fields.titolo
                            tags.compositore = fields.fase
                            tags.genere = fields.scuola
                            tags.date = fields.data
                            console.log('tags',tags)
                            require('../utilities/tagFacility').write('./uploads/'+nome_upload,tags,function(err){
                                callback(err,data2pass)
                            })
                        },
         fileMover = function(path,callback){
            require('../utilities/fileUtilities').moveFile('./uploads/'+nome_upload,path
            +fields.nomeFile+fields.estensione,function(){
                callback(err,path+fields.relativePath
                                         +fields.nomeFile)

            })
          },
         makeDir = function(path,callback) {
         require('../utilities/fileUtilities').makedir(path,fields.relativePath,callback)
         },insertDb = function(path,callback){
         var fileRecord = {}
         fileRecord.titolo = fields.titolo
         fileRecord.fase = fields.fase
         fileRecord.scuola = fields.scuola
         fileRecord.relatore = fields.relatore
         fileRecord.data = fields.dataRegistrazione
         fileRecord.operatore = require('mongoose').Types.ObjectId(fields.operatore)
         fileRecord.paroleChiave = fields.paroleChiave || []
         fileRecord.wang = fields.wang
         fileRecord.fogueo = fields.fogueo
         fileRecord.fogueo_istruttori = fields.fogueo_istruttori
         fileRecord.relativePath = fields.relativePath
         fileRecord.nomeFile = fields.nomeFile + fields.estensione
         console.log(path)
         //console.log(joe)
            require('./files_routing').insertFile(fileRecord,function(err){ /* wrapper alla funzione di callback per
             adattare la funzione a waterfall*/
             console.log('insertdb: ',err)
            callback(null,path)
            })
         };
         var data = {}
         data.token = checked.token
         if(checked.valido)
         {
            data.tokenExpired = false
             async.waterfall([
                                retrievePath,
                                makeDir,
                               setTags,
                                fileMover,
                                insertDb
                            ],function(error,success)
                            {
                                console.log('waterfall done')
                                if(err)
                                {
                                    console.log('errore',err)
                                    data.success = false
                                }
                                else
                                {
                                    console.log('waterfall success')
                                    data.success = true
                                }
                                res.json(data)
                            })
         }
         else
         {
            console.log('token scaduto')
            data.success = false
            data.tokenExpired = true
            data.token = checked.token
            res.json(data)
         }
        //res.send(config)

        })
 }
 }