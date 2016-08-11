'use strict';
 var roleModel = require('../models/Role');
module.exports = {
    list : function(req,res){
        roleModel.find({},function(err,roles){
            if(err){
            res.status(404).send(err);
            }
            else{
            res.json(roles)
            }
        })

    }
}