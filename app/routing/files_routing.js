'use strict';
 var File = require('../models/File');
module.exports = {
insertFile: function(file,callback){
var registrazione = new File(file)
registrazione.save(callback)
},
importFiles:function(req,res)
}