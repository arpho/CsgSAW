'use strict'
var id3 = require('id3-writer');
var writer = new id3.Writer();
module.exports = {
    write: function( file,tags,callback)
     /* scrive i tag nel file
                                           @param file: percorso del file cui aggiungere i tags
                                           @param tags: tags da settare*/
    {
    var File = new id3.File(file)
    var meta = new id3.Meta(tags);
        //console.log('writing metatag:',tags)
        writer.setFile(File).write(meta, function(err) {
            callback(err)
        })
    }

}