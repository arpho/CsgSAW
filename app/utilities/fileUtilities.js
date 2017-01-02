'use strict'
var fs = require('fs'),async = require('async'),
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
	    data.success = false
         data.expiredToken = true
         res.json(data)
	 }
	 else
	 {
	    data.success = true

	    retrievePath(function(err,resp){
	    if(err){
	        data.success = false
	        rse.json(data)
	    }
	    //console.log('resp fileexist*******************************************************************************',resp)
	    var fullPath = resp  + body.path + body.nomeFile + body.estensione
	    console.log(fullPath)
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
fileExists : fileExist
}