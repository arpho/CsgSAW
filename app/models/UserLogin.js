// grab the mongoose module
'use strict';
var mongoose = require('mongoose');
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('UserLogin', {
enabled:Boolean,
dataUser:  {type: mongoose.Schema.Types.ObjectId, ref: 'DataUser'},
hashed_password:{words:[Number],sigBytes:Number},
salt:{words:[Number],sigBytes:Number},
email: String
})