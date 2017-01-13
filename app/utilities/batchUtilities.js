'use strict';

class TemaFaseAB {
 constructor(recordFile){
 this.relativePath = recordFile.relativePath +'/'
 this.fase = recordFile.relativePath.split('/')[1].substring(2)
 this.code = recordFile.relativePath.split('/')[2].split('_')[0]
 this.titolo = recordFile.relativePath.split('/')[2].split('_')[1]
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

 getRelativePath() {
     return this.relativePath
 }
}


module.exports = {
TemaFaseAB : TemaFaseAB,
TemaFaseC : TemaFaseC,
Registrazione : Registrazione
}