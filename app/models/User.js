// grab the mongoose module
'use strict';
var mongoose = require('mongoose'),
addressSchema = mongoose.Schema({street:String,city:String,cap: String,note:String})
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('User', {
                                        	nome : String,
                                        	cognome :String,
                                        	enabled : Boolean,
                                        	sospeso :  Boolean,
                                        	dob :{type:Date, default:Date.now},
                                        	address:[ addressSchema],
                                        	email: String,
                                        	skype:String,
                                        	roles:[String],
    hashed_password:{words:[Number],sigBytes:Number},
   salt:{words:[Number],sigBytes:Number},
   // email: String
});