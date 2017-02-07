'use strict';
 var File = require('../models/File'),
 async = require('async');
module.exports = {
insertFile: function(file,callback)
{
    var registrazione = new File(file)
    registrazione.save(callback)
},
downloadFile : (req,res) => {
    var folder = req.body.folder
    var data = {result:'ok'},
    path = require('../utilities/wrapperCache').retrieve('projectRoot') + '/app/temp/'+ folder  + '/registrazioni.zip'
    console.log('path',path)
    res.download(path,'registrazioni.zip', (err) => {
        console.log('download done',err)
    })
},
importFiles:function(req,res)
{
    var fileUtilities = require('../utilities/fileUtilities'),
    configs = require('./configs_routing')
    configs.retrievePath(function(err,rootPath)
    {
        var fileList = fileUtilities.retrieveAllFile(rootPath)
    })
},
filesList: require('../utilities/fileUtilities').filesList
}
