'use strict'
var fs = require('fs'),async = require('async'),

incrementCounter = function(counter){
/*
incrementaun contatore
@param il contatore da incrementare: String
*/

                        var n = cache.retrieve('counter')
                        cache.setCache('counter',n+1)
},

importSingleRecord = require('./batchUtilities').insertBatchFile,
 importSingleFile = function(file,callback){
    /*
    importa un singolo file nel database
    @param file:{nomeFile:AString,fullPath:String, relativePath:String}
    @param callback:function(err)
    */
    console.log('importofile ',file)
    var Tag = require('./tagFacility'),
    recordFile = Tag.buildRecordFile(Tag.splitName(file.nomeFile)),
    tema = Tag.buildTema(Tag.splitTema(file.relativePath)), // '/8_FASE B/B31_IL Raggio della creazione'
    Tema = require('../models/Tema'),
    File = require('../models/File');
    callback({tema:tema,recordFile:recordFile})
    var async = require('async')
    console.log('inserisco nel db')
    async.parallel([


    function(callback)
    {
        Tema.update({code:tema.code},tema,{upsert:true},function(err,numAffected,raw){
            if(!err){
                if(!raw.updatedExisting) // inserito nuovo tema
                    incrementCounter('importedTemaCounter')

                else
                    incrementCounter('updatedTemaCounter')
            }
            console.log('callback tema, errori:',err)
            callback(err)
        })
    },
    function(callback)
    {
        console.log('async.parallel inserisco la registrazione',recordFile)
        File.update({data:recordFile.data,
        titolo:recordFile.titolo,scuola:recordFile.scuola},recordFile,{upsert:true},function(err,results){
                                                                                                console.log('callback file, errori:',err)
                                                                                                callback(err)
                                                                                            })
    }
    ],function(err,results){
        console.log('async.parallel finito')
        console.log('errori:',err)
        console.log('results',results)
        callback(err)
    })


},

walkSync = function(dir, filelist,root) {
  var fs = fs || require('fs'),
      files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir +'/'+ file).isDirectory()) {
      filelist = walkSync(dir + '/'+file , filelist,root);
      //console.log(dir +'/'+ file+'************************************************')
    }
    else {
      filelist.push({nomeFile:file,fullpath:dir+'/',relativePath:dir.substring(root.length)});
    }
  });
  return filelist;
};


var filesList = function(req,res) {
    body = req.body,Token = require('./tokenGenerator'), cache = require('./wrapperCache'),
    checkToken = Token.renewToken(body.token,body.email), File = require('../models/File'),
    query = body.query||{},
    start = body.start,
    end = body.end, async = require('async')

},
 creaFolderAsync = function(folder,callback){
	//console.log('creo async ' +folder)
	fs.mkdir(folder,function(err,data){
		if (err) {
			//console.log('errore async:',err)
			if(err.code=='EEXIST'){
//				console.log('cartella già presente:',folder)
				callback() //fine funzione serie
			}
			else {
			console.log('errore grosso',err)
			callback(err) //fine funzione serie
			}
		}
		else {
			callback() //fine funzione serie
		}
		})
},retrieveAllFiles = function(dir){
/*
ritorna la lista di tutti i file in una directory e nelle sue sottodirectory
@param directory da esaminare:String
@return [{nomeFile:AString,fullPath:String, relativePath:String}]
*/
console.log('first dir',dir)
return walkSync(dir,null,dir)
},
importBatchFile = function(req,res)
{   console.log('batch import')

	 var body = req.body,Token = require('../utilities/tokenGenerator'), cache = require('./wrapperCache'),
	 checkToken = Token.renewToken(body.token,body.email),retrievePath = require('../routing/configs_routing').retrievePath,
	 data = {token : checkToken.token}

	 console.log('token',body.token)
	 console.log('email',body.email)
	 if(!checkToken.valido)
	 {
	    console.log('token scaduto: batchImport')
         data.success = false
         data.expiredToken = true
         res.json(data)
	 }
	 else
	 {
	     cache.setCache('wrongFile',[])
	     cache.setCache( 'importedFileCounter',0) // inizializzo il contatore dei file importati
	     cache.setCache( 'updatedFileCounter',0) // inizializzo il contatore dei file aggiornati
	     cache.setCache( 'updatedTemaCounter',0) // inizializzo il contatore dei temi aggiornati
	 cache.setCache( 'importedTemaCounter',0) // inizializzo il contatore dei temi importati
	    console.log('batchImport token ok')
	    data.success = true
        data.expiredToken = false
        retrievePath(function(err,rootDir)
        {
            if(err){
            data.success = false
            data.expiredToken = false
            res.json(data)
            }
            var fileList = walkSync(rootDir,null,rootDir)
            async.each(fileList,importSingleRecord,function(err) { //TODO to check
                console.log('finished batch import',err)
                console.log(' sono stati elaborati',fileList.length,' file')
                data.success = true
                data.fileCaricati = fileList.length
                data.fileImportati = cache.retrieve('importedFileCounter')
                data.fileAggiornati = cache.retrieve('updatedFileCounter')
                data.temiImportati = cache.retrieve('importedTemaCounter')
                data.temiAggiornati = cache.retrieve('updatedTemaCounter')
                data.wrongFile = cache.retrieve('wrongFile')
                if(err) data.success = false
                res.json(data)
            })
        })
	 }
},
creaFullPath = function(root,path,callback){
	var folderList = path.split('/'), relativePath = root
	for (var i = 0;i <folderList.length;i++){
		relativePath += '/' + folderList[i]
		creaFolder(relativePath)
	}
},
creaFullPathAsync = function(root,path,callback){

	var folderList = path.split('/'), relativePath = root,functionList = [],
	makeClosure = function(relativePath){
	//console.log('creata closure',relativePath)
		return function(callback){
		//console.log(' eseguita closure:',relativePath)
			creaFolderAsync(relativePath,callback)
			}
	}
	for (var i = 0;i <folderList.length;i++){
		relativePath += '/' + folderList[i]
		functionList.push(makeClosure(relativePath))
	}
	async.series(functionList,function(err, results){
	callback(null,root+path)
	})
	},


	fileExist = function(req,res){
	 var body = req.body,Token = require('../utilities/tokenGenerator'),checkToken = Token.renewToken(body.token,body.email)
	 var data = {}, retrievePath = require('../routing/configs_routing').retrievePath
	 data.token = checkToken.token
	 if (!checkToken.valido)
	 {
	    console.log('token scaduto' )
	    data.success = false
         data.expiredToken = true
         res.json(data)
	 }
	 else
	 {
	    console.log('token valido')
	    data.success = true
	    retrievePath(function(err,resp){ // recupero il root per comporre il path del file
        	    if(err){
        	        data.success = false
        	        rse.json(data)
        	    }
        	    var fullPath = resp  + body.relativePath + body.nomeFile + body.estensione
        	    data.exists = fs.existsSync(fullPath)
        	    res.json(data)
        	    })
    }

	 }


module.exports = {moveFile:function(oldPath,newPath,callback){
    /*
    sposta un file dalla posizione di origine a quella di destinazione
    @param oldPath:String path completo posizione origine
    @param newPath:String path completo posizione di destinazione

    */
    require('mv')(oldPath,newPath,{mkdirp:true},callback)
},
makedir : creaFullPathAsync,
fileExists : fileExist,
//importSingleFile:importSingleFile,
batchImport: importBatchFile,
retrieveAllFiles: retrieveAllFiles,
filesList: filesList
}