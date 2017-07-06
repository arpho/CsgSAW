'use strict';
var mongoose = require('mongoose');
var roleSchema= mongoose.Schema({role:String})
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Role', {
    role: String
})