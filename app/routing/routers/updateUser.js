'use strict';
module.exports = function(req,res){
var user= req.body, mongoose = require('mongoose');
var User = require('../../models/User')
var _id = mongoose.Types.ObjectId(user._id)
User.update({_id:_id},user,function(err,us){
if(err){
return
}
console.log('user updated',us)
})
}