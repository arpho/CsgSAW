'use strict';
var  tap = require('tap'),Tag = require('../utilities/tagFacility'),File = require('../utilities/tagFacility')
file1 = '2009-11-08 - MI - _ - Essere istruttori_(parte finale del fogueo) - Wang.mp3',
file2 = '2010-05-04 - _ - Fase A - Cos\'è la Gnosi - Teresa.mp3',
file3 = '2010-05-04 - _ - Fase B - Cos\'è la Gnosi - Teresa.mp3',
expected = {
    data:new Date('2009-11-08'),
    scuola:'MI',
    fase:'_',
    titolo:'Essere istruttori_(parte finale del fogueo)',relatore:'Wang.mp3'
},
expected2 = {
    data:new Date('2010-05-04'),
    scuola:'_',
    fase:'Fase A',
    titolo:'Cos\'è la Gnosi',
    relatore:'Teresa.mp3'
},
fileRecord = { nomeFile: '2010-10-05 - MI - Fase B - Raggio della Creazione - Reggy.mp3',
                 fullpath: '/media/giuseppe/KINGSTONE/2_ARCHIVIO REGISTRAZIONI/8_FASE B/B31_IL Raggio della creazione/',
                 relativePath: '/8_FASE B/B31_IL Raggio della creazione' }
tap.same(Tag.buildRecordFile(Tag.splitName(file1)),expected,'file1 tags:ok')
tap.same(Tag.buildRecordFile(Tag.splitName(file2)),expected2,'file2 tags:ok')
tap.true(Tag.checkTemaFase(file2),'è un tema di fase')
tap.false(Tag.checkTemaFase(file1),'non è un tema di fase')
tap.true(Tag.checkTemaFase(file3),'è un tema di fase')
tap.same(Tag.splitTema('/8_Fase B/B25_Pratica Yin Yang'),['B25','Pratica Yin Yang'],'split tema')
tap.same(Tag.buildTema(Tag.splitTema('/8_Fase B/B25_Pratica Yin Yang')),{code:'B25',titolo:'Pratica Yin Yang',fase:'B'},'Tema')
//console.log(Tag.buildRecordFile(Tag.splitName(file1)))
//console.log('tema di fase',Tag.checkTemaFase(file2))
