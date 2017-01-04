'use strict';
var  mongoose = require('mongoose');
                           // module.exports allows us to pass this to other files when it is called
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('File', {
   titolo: String,
   fase:String,
   data:Date,
   scuola:String,
   relatore:String,
   Wang:Boolean,
   paroleChiave:[String],
   dataCaricamento:{type:Date, default:Date.now},
   operatore:mongoose.Schema.Types.ObjectId,
   relativePath:String,
   fogueo_istruttori:Boolean,
   fogueo:Boolean,
   nomeFile:String,
   estensione:String,
   tipo:String,
   codiceTema:String,


})
