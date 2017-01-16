'use strict';

var yinYang =  { nomeFile: '2015-03-31 - MI - Fase B - La pratica dello Yin e Yang - Fabiana.mp3',
                      fullpath: '/media/giuseppe/KINGSTONE/2_ARCHIVIO REGISTRAZIONI/8_FASE B/B25_Pratica Yin Yang/',
                      relativePath: '/8_FASE B/B25_Pratica Yin Yang' },
        File = require('../utilities/batchUtilities').FileAudio,
 mongoose       = require('mongoose'),
 db = require('../../config/db'),
        file = new File(yinYang)
 mongoose.connect(db.url);
console.log('invoco inssertOneRecord')
        file.insertOneRecord(file.getTema().getJson(),file.getRegistrazione().getJson(),function(err,data) {
        console.log('inserito one record')
        console.log('errori:',err)
        console.log('data',data)
        })