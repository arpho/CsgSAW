// grab the mongoose module
'use strict';
var mongoose = require('mongoose');
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('UserLogin', {
enabled:Boolean,
hashed_password:String,
salt:String,
email: String
})