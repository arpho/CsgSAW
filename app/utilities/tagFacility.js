'use strict'
var id3 = require('id3-writer'),
check4fogueoIstruttori = function(txt)
                         {
                                if (txt.match(/fogueo istruttori/i)) return true
                                return false
                         },
check4fogueo = function(txt){
if(txt.match(/fogueo/i) && !check4fogueoIstruttori(txt)) return true
return false
},
check4Wang = function(txt){
    if (txt.match(/wang/i)) return true
    return false
};
var writer = new id3.Writer(), buildTema = function(fields)
                                               {

                                                   return {code:fields[0],titolo:fields[1],
                                                   fase:fields[0].match(/A|B/)[0],relativePath:fields[2]}
                                               };
module.exports = {
    splitName: function(name){
        return name.split(' - ')
    },
    buildRecordFile: function(tags){
        return {data:new Date(tags[0]),scuola:tags[1],fase:tags[2],titolo:tags[3],
        relatore:tags[4].substring(0,tags[4].length - 4),estensione:tags[4].substring(tags[4].length - 4),
        wang:check4Wang(tags[4]),fogueo_istruttori:check4fogueoIstruttori(tags[3]),fogueo:check4fogueo(tags[3])}
    },
    splitTema: function(txt){
        var step0 = txt.split('/') // isolo la cartella del tema
        var step1 = step0[2].split('_') // scompongo il tema in codice e titolo
        step1.push(txt.substring(1)+'/') // questo è il relativePath del tema
        return step1
    },
    buildTema: buildTema,
    checkTemaFase: function(txt){
    return txt.match(/(Fase A)|(Fase B)/)
    },

    write: function( file,tags,callback)
     /* scrive i tag nel file
                                           @param file: percorso del file cui aggiungere i tags
                                           @param tags: tags da settare*/
    {
    var File = new id3.File(file,'tema di fase')
    var meta = new id3.Meta(tags);
        //console.log('writing metatag:',tags)
        writer.setFile(File).write(meta, function(err) {
            callback(err)
        })
    }

}