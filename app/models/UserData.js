// grab the mongoose module
'use strict';
var mongoose = require('mongoose');
var addressSchema = nemongoose.Schema{via:String,city:String,cap: String}

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('DataUser', {
	nome : String,
	cognome :String,
	attivo : Boolean,
	sospeso :  Boolean,
	dob :{type:date, default:Date.now},
	indirizzo:{ addressSchema},
	email: String,
	user_id:ObjectId,
	skype:String,
	ruoli:[String]
});
