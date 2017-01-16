'use strict';

class TemaFaseAB {
 constructor(recordFile){
 this.relativePath = recordFile.relativePath +'/'
 this.fase = recordFile.relativePath.split('/')[1].substring(2)
 this.code = recordFile.relativePath.split('/')[2].split('_')[0]
 this.titolo = recordFile.relativePath.split('/')[2].split('_')[1]
 }

     whois() {
         return 'FaseAB'
     }

 getJson() {
    return {
        titolo: this.titolo,
        fase: this.fase,
        code: this.code
    }
 }

 getFase() {
    return this.fase
 }
 getCode() {
    return this.code
 }

 getTitolo() {
    return this.titolo
 }

 getRelativePath() {
     return this.relativePath
 }

}
var retrieveRelatore = function(txt) {
    var relatore = txt.substring(0,txt.length-4)
    return relatore
}, retrieveEstensione = function(txt) {
    return txt.substring(txt.length-3)

}

class Registrazione {
    constructor(recordFile){
        var nomeFile = recordFile.nomeFile
        this.data = new Date(nomeFile.split(' - ')[0])
        this.titolo = nomeFile.split(' - ')[3]
        this.scuola = nomeFile.split(' - ')[1]
        this.fase = nomeFile.split(' - ')[2]
        this.relatore = retrieveRelatore(nomeFile.split(' - ')[4])
        this.estensione = retrieveEstensione(nomeFile.split(' - ')[4])
        this.nomeFile = nomeFile
        this.relativePath = recordFile.relativePath +'/'
        this.wang = this.fromWang(this.nomeFile)
        this.fogueo_istruttori = this.isFogueoIstruttori(this.nomeFile)

    }

    isFogueoIstruttori(txt) {
        return !(txt.search(/fogueo istruttori/i) == -1)
    }

    fromWang(txt) {
    return !txt.search(/wang/i) == -1
    }

    getJson() {
    return {
        fogueo_istruttori: this.fogueo_istruttori,
        wang: this.wang,
        titolo: this.titolo,
        fase: this.fase,
        data: this.data,
        scuola: this.scuola,
        relatore: this.relatore,
        relativePath: this.relativePath,
        nomeFile:this.nomeFile,
        estensione: this.estensione,
    }
    }

    getRelativePath() {
        return this.relativePath
    }

    getNomeFile() {
        return this.nomeFile
    }

    getEstensione() {
        return this.estensione
    }

    getFase() {
        return this.fase
    }

    getRelatore() {
    return this.relatore
    }

    getScuola() {
         return this.scuola
    }

    getTitolo() {
         return this.titolo
    }

    getDate() {
        return this.data
    }


}

class TemaFaseC {
    constructor(recordFile){
            //super(recordFile)
            this.relativePath = recordFile.relativePath + '/'
            this.fase = 'FASE C'
            this.code = recordFile.relativePath.split('/')[1].split('_')[0]
            this.titolo = recordFile.relativePath.split('/')[1].split('_')[1]
    }
    getFase() {
        return this.fase
     }
     getCode() {
        return this.code
     }

     getTitolo() {
        return this.titolo
     }

     getJson() {
         return {
             titolo: this.titolo,
             fase: this.fase,
             code: this.code
         }
     }
     getRelativePath() {
         return this.relativePath
     }

     whois() {
        return 'Fase C'
     }
}

class AnnoEsoterico extends TemaFaseAB {

    constructor(recordFile) {
        super(recordFile)
        this.fase =  'FASE C'
    }



    whois() {
        return 'annoEsoterico'
    }

}


class FileAudio{

    insertOneRecord(tema,registrazione,callback) {

        console.log('Start insertOneRecord:inserisco un record nel db')
    var Tema = require('../models/Tema'),
    File = require('../models/File'),
    async = require('async')
    async.parallel([
    function(callback) {
        console.log('inserisco il tema')
        Tema.update({code:tema.code},tema,{upsert:true},function(err,data) {
        console.log('salvato tema',data)
        console.log('errore:',err)
        callback(err,data) // invoco la callback di async

        })
    },
    function(callback) {
        console.log('inserisco il file')
        File.update({data:registrazione.data,relatore:registrazione.relatore},registrazione,{upsert:true},function(err,data){
            console.log('inserita registrazione')
            console.log('errore',err)
            console.log('dati registrazione',data)
            callback(err,data) // invoco callback di async
        })
    }
    ],
    function(err,data) { // invoco la funzione di callback passata dal chiamante
        console.log('parallel done')
        callback(err,data)
    })
    }

    getTema() {
        return Object.create(this.tema)
    }

    getRegistrazione() {
        return Object.create(this.registrazione)
    }

    constructor(recordFile) {
        this.registrazione = new Registrazione(recordFile)
        if(recordFile.relativePath.split('/').length==2) { // tema di fase C
            this.tema = new TemaFaseC(recordFile)
            return
        }
        if(recordFile.relativePath.split('/').length==3 && recordFile.relativePath.search(/wang/i)!=-1) { // registrazione mercoledì esoterici
            this.tema =  new AnnoEsoterico(recordFile)
            return
        }
        this.tema = new TemaFaseAB(recordFile) // tema fase A o B
    }

}

module.exports = {
TemaFaseAB : TemaFaseAB,
TemaFaseC : TemaFaseC,
Registrazione : Registrazione,
AnnoEsoterico : AnnoEsoterico,
FileAudio : FileAudio,
}