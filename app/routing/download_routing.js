'use strict';
var archiver = require('archiver'),
fs = require('fs-extra'),
async = require('async'),
cache = require('../utilities/wrapperCache')
module.exports = function (req,res) {
  var body = req.body,Token = require('../utilities/tokenGenerator'),checkToken = Token.renewToken(body.token,body.email),
  id = new Date().getTime();
  var  waterFallAray = [
      require('./configs_routing').retrievePath, // ottengo il root dei file e lo passo alla funzione successiva
      function(root,callback) {     // converto i nomi dei file in un formato accettabile per express-zip
          var files = body.files
          //copyArrayFile(files,root,callback)
          var files2zip = []
          files.forEach((file,i,arr) =>{
              files2zip.push({path:root + file.relativePath + file.nomeFile,name:file.nomeFile})
          })
          //console.log(files2zip,'lista2zip')
          callback(null,files2zip)

      }
  ]
  if (checkToken.valido){
      var files = body.files
      async.waterfall(waterFallAray,(err,data) => {
          console.log('waterfall done')
          console.log('errori:',err)
          var zip = require('express-zip');
          //console.log(data[0].path)
          //res.download(data[0].path,(err)=>{console.log('download, error:',err)})
          res.zip(data,(err)=>{
              console.log('file sent',err)
          })//.end({msg:'ciao, download ok'})
      })
            //  console.log('il file è',Path.resolve(path)+'/registrazioni.zip')
//              res.download(Path.resolve(path+'/registrazioni.zip'))
              //res.json(data)

          }
      } //module.exports
