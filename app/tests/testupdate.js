var mongoose= require('mongoose'),db = require('../../config/db'), Tema = require('../models/Tema'),tema = { code: 'B20',
  titolo: 'Fogueo Studenti Fase B',
  fase: 'B',
  relativePath: '8_FASE B/B20_Fogueo Studenti Fase B/' }
  //tema = new Tema(tema)
   mongoose.connect(db.url);
  console.log('inserisco nel db')
  Tema.findOne({code:tema.code},tema,function(err,tema){
	  if(!tema){
		  tema = new Tema(tema)
		  tema.save(function(err,data){
			  console.log('salvato:',data)
			  console.log('errori',err)
			  })
	console.log('callback:',err,tema)
  }})

