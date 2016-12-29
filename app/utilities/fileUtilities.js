'use strict'
var fs = require('fs')
module.exports = {moveFile:function(oldPath,newPath,callback){
    /*
    sposta un file dalla posizione di origine a quella di destinazione
    @param oldPath:String path completo posizione origine
    @param newPath:String path completo posizione di destinazione

    */
    console.log('invoco fs.rename')
    fs.rename(oldPath,newPath,callback)
},
makedir : function(path,callback){
fs.mkdir(path, function(err){
console.log('makedir',err)
 if (err.code=='EEXIST') callback(null,path)
})
}
}