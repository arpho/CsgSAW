'use strict';
module.exports = function(req,res){
var User = require('../../models/User')
User.find({},function(err,users){
    if(err){
        console.err(err)
        res.status(404).send()
    }
    res.json({status:'ok',users:users})
})
}