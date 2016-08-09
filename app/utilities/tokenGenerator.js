'use strict';
var randtoken = require('rand-token');
module.exports = {
    generateToken: function(){
        return randtoken.generate(128)
    }
}