'use strict';
var  tap = require('tap'),Tag = require('../utilities/tagFacility'),File = require('../utilities/fileUtilities'),
file1 = '2009-11-08 - MI - _ - Essere istruttori_(parte finale del fogueo) - Wang.mp3',
file2 = '2010-05-04 - _ - Fase A - Cos\'è la Gnosi - Teresa.mp3',
file3 = '2010-05-04 - _ - Fase B - Cos\'è la Gnosi - Teresa.mp3',
fileRecord2 = { nomeFile: '2016-01-26 - MI - Fase B - Fogueo Temi Fase A - _.mp3',
            fullpath: '/media/giuseppe/KINGSTONE/2_ARCHIVIO REGISTRAZIONI/8_FASE B/B20_Fogueo Studenti Fase B/',
            relativePath: '/8_FASE B/B20_Fogueo Studenti Fase B' },
expected = {
    wang: true,
    fogueo_istruttori: false,
    fogueo:true,
    data:new Date('2009-11-08'),
    scuola:'MI',
    fase:'_',
    nomeFile: '2009-11-08 - MI - _ - Essere istruttori_(parte finale del fogueo) - Wang.mp3',
    titolo:'Essere istruttori_(parte finale del fogueo)',
    relatore:'Wang',
    estensione:'.mp3',
    wang: true
},
expected2 = {
    wang: false,
    fogueo:false,
    fogueo_istruttori:false,
    data:new Date('2010-05-04'),
    scuola:'_',
    fase:'Fase A',
    titolo:'Cos\'è la Gnosi',
    relatore:'Teresa',
    nomeFile: '2010-05-04 - _ - Fase A - Cos\'è la Gnosi - Teresa.mp3',
    estensione:'.mp3'
},
fileRecord = { nomeFile: '2010-10-05 - MI - Fase B - Raggio della Creazione - Reggy.mp3',
                 fullpath: '/media/giuseppe/KINGSTONE/2_ARCHIVIO REGISTRAZIONI/8_FASE B/B31_IL Raggio della creazione/',
                 relativePath: '/8_FASE B/B31_IL Raggio della creazione' }
var expectedTema = {code:'B31',fase:'B',titolo:'IL Raggio della creazione',relativePath:'8_FASE B/B31_IL Raggio della creazione/'},
 expectedTema2 = {code:'B20',fase:'B',titolo:'Fogueo Studenti Fase B',relativePath:'8_FASE B/B20_Fogueo Studenti Fase B/'},
expectedFile = {
    data: new Date('2010-10-05'),
    scuola:'MI',
    nomeFile: '2010-10-05 - MI - Fase B - Raggio della Creazione - Reggy.mp3',
    fase: 'Fase B',
    titolo:'Raggio della Creazione',
    relatore:'Reggy',
    fogueo:false,
    fogueo_istruttori: false,
    estensione:'.mp3',
    wang: false
},
expectedFile2 = {
    data: new Date('2016-01-26'),
    scuola:'MI',
    fase: 'Fase B',
    fogueo_istruttori:false,
    fogueo: true,
    titolo:'Fogueo Temi Fase A',
    relatore:'_',
    estensione:'.mp3',
    nomeFile:'2016-01-26 - MI - Fase B - Fogueo Temi Fase A - _.mp3',
    wang: false
},
fileUtilities = require('../utilities/fileUtilities')
tap.same(Tag.buildRecordFile(Tag.splitName(file1)),expected,'file1 tags:ok')
tap.same(Tag.buildRecordFile(Tag.splitName(file2)),expected2,'file2 tags:ok')
tap.true(Tag.checkTemaFase(file2),'è un tema di fase')
tap.false(Tag.checkTemaFase(file1),'non è un tema di fase')
tap.true(Tag.checkTemaFase(file3),'è un tema di fase')
tap.same(Tag.splitTema('/8_Fase B/B25_Pratica Yin Yang'),['B25','Pratica Yin Yang','8_Fase B/B25_Pratica Yin Yang/'],'split tema')
tap.same(Tag.buildTema(Tag.splitTema('/8_Fase B/B25_Pratica Yin Yang')),{code:'B25',titolo:'Pratica Yin Yang',fase:'B',relativePath:'8_Fase B/B25_Pratica Yin Yang/'},'Tema')
fileUtilities.importSingleFile(fileRecord,function(resp){
    tap.same(resp.tema, expectedTema,'tema estratto correttamente')
    tap.same(resp.recordFile,expectedFile,'recordFIle0 generato correttamente')
})

fileUtilities.importSingleFile(fileRecord2,function(resp){
    tap.same(resp.tema, expectedTema2,'tema estratto correttamente')
    tap.same(resp.recordFile,expectedFile2,'recordFIle2 generato correttamente')
})
//console.log(Tag.buildRecordFile(Tag.splitName(file1)))
//console.log('tema di fase',Tag.checkTemaFase(file2))
