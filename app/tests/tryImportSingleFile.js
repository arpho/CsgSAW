var File = require('../utilities/fileUtilities')
var mongoose= require('mongoose'),db = require('../../config/db')

   mongoose.connect(db.url);
var file = { nomeFile: '2016-03-22  - MI - Fase B - Fogueo di comprensione sui temi di fase A - Nicola.mp3',
               fullpath: '/media/giuseppe/KINGSTONE/2_ARCHIVIO REGISTRAZIONI/8_FASE B/B20_Fogueo Studenti Fase B/',
               relativePath: '/8_FASE B/B20_Fogueo Studenti Fase B' }
File.importSingleFile(file,function(err){
console.log('file inserito  file:',file,'con errore',err)
})