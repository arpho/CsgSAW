'use strict'
var ffmetadata = require('ffmetadata')
module.exports = {
    write: function( file,tags,callback)
     /* scrive i tag nel file
                                           @param file: percorso del file cui aggiungere i tags
                                           @param tags: tags da settare*/
    {
        ffmetaadata.write(file,tags,function(err){
            callback(err,path)
        })
    }

}