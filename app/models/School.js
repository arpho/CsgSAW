'use strict';
var mongoose = require('mongoose'),
 mongoose = require('mongoose'),
                           addressSchema = mongoose.Schema({street:String,city:String,cap: String,note:String}),
                           contactSchema = mongoose.Schema({contact:String,type:String,note:String})
                           // module.exports allows us to pass this to other files when it is called
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('School', {
    responsabile: mongoose.Schema.Types.ObjectId,
    sede:String,
    denominazione:String,
    address:[addressSchema],
    contacts: [contactSchema],
    folders:[{cartella:String,spazio:Number,uso:String}]
})
