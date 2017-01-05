'use strict'
var fs = require('fs'),async = require('async')
var root,importSingleFile = function(file,callback){
    /*
    importa un singolo file nel database
    @param file:{nomeFile:AString,fullPath:String, relativePath:String}
    @param callback:function(err)
    */
    var Tag = require('./tagFacility'),
    recordFile = Tag.buildRecordFile(Tag.splitName(file.nomeFile)),
    tema = Tag.buildTema(Tag.splitTema(file.relativePath)),
    Tema = require('../models/Tema'),
    File = require('../models/File');
    callback({tema:tema,recordFile:recordFile})
    var async = require('async')
    async.parallel([


    function(callback)
    {
        tema.update({code:tema.code},tema,{upsert:true},callback)
    },
    function(callback)
    {
        File.update({data:recordFile.data,
        titolo:recordFile.titolo,scuola:recordFile.scuola},recordFile,{upsert:true},callback)
    }
    ],callback)


},

walkSync = function(dir, filelist) {
  var fs = fs || require('fs'),
      files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir +'/'+ file).isDirectory()) {
      filelist = walkSync(dir + '/'+file , filelist);
      //console.log(dir +'/'+ file+'************************************************')
    }
    else {
      filelist.push({nomeFile:file,fullpath:dir+'/',relativePath:dir.substring(root.length)});
    }
  });
  return filelist;
};


var creaFolderAsync = function(folder,callback){
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
root = dir
return walkSync(root)
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
importSingleFile:importSingleFile
}