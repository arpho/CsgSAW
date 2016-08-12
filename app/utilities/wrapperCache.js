'use strict';
var cache = require('./cache')
module.exports = {
    setCache : function(key,value){
        cache.set(key,value)
    },
    retrieve : function(key){
        return cache.get(key)
    },
    removeToken : function(key){
    cache.del(key)
    }
}