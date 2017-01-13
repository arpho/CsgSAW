'use strict'
var id3 = require('id3-writer'),
 getFase = function(txt) {
    if(txt.match(/A|B/)) return txt.match(/A|B/)[0]
    return 'C'
 },
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
var writer = new id3.Writer(),
 buildTema = function(fields)
                                               {

                                                   return {code:fields[0],titolo:fields[1],
                                                   fase:getFase(fields[0]),relativePath:fields[2]} //TODO fix error
                                               };
module.exports = {
    splitName: function(name){
        var out = name.split(' - ')
        out.push(name) // aggiungo il nome del file perchè sia disponibile per buildRecordFile
        return out
    },
    buildRecordFile: function(tags){
        console.log('buildRecordFile: ',tags)
        return {data:new Date(tags[0]),scuola:tags[1],fase:tags[2],titolo:tags[3],
        relatore:tags[4].substring(0,tags[4].length - 4),estensione:tags[4].substring(tags[4].length - 4),
        wang:check4Wang(tags[4]),fogueo_istruttori:check4fogueoIstruttori(tags[3]),fogueo:check4fogueo(tags[3]),
        nomeFile: tags[5]
        }
    },
    splitTema: function(txt){
        console.log('tema',txt,'******************************************************************************************************************')
        var step0 = txt.split('/'), // isolo la cartella del tema
        step1 = ['',step0[step0.length]] // preparo step1 perché funzioni in tutti i casi il primo elemento non è mai utilizzato,ilsecondo è il titolo
        console.log('/////////////////////////////////////////////////////////////////////////////////////splittedtema',step0,step0.length)
        //if (step0.length>2)
            if (step0[2])
                step1 = step0[2].split('_') // scompongo il tema in codice e titolo
            else
                step1 = step0[1].split('_')
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