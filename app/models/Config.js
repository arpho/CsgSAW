'use strict';
var mongoose = require('mongoose');
                           // module.exports allows us to pass this to other files when it is called
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Config', {
    label:String,
    actualValue:String,
    previousValue:String
})