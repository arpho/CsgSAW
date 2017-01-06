'use strict';
 var File = require('../models/File'),
 async = require('async');
module.exports = {
insertFile: function(file,callback)
{
    var registrazione = new File(file)
    registrazione.save(callback)
},
importFiles:function(req,res)
{
    var fileUtilities = require('../utilities/fileUtilities'),
    configs = require('./configs_routing')
    configs.retrievePath(function(err,rootPath)
    {
        var fileList = fileUtilities.retrieveAllFile(rootPath)
    })
}
}