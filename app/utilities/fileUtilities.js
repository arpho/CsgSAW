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
	}

module.exports = {moveFile:function(oldPath,newPath,callback){
    /*
    sposta un file dalla posizione di origine a quella di destinazione
    @param oldPath:String path completo posizione origine
    @param newPath:String path completo posizione di destinazione

    */
    console.log('moveFile,oldpath',oldPath)
    console.log('newpath',newPath)
    console.log('mv')

    require('mv')(oldPath,newPath,{mkdirp:true},callback)
},
makedir : creaFullPathAsync
}