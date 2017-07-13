const user = require('../models/User');
const Token = require('../utilities/tokenGenerator');
const Cache = require('../utilities/wrapperCache');
module.exports = (req,res,next)=>{

    const token = req.body.token;
    const email = req.body.email;
    check = Token.renewToken(token,email)
    if(!check.valido){
        res.error('token scaduto')
    }
    else{
            res.out = {};
            res.out.token = check.token;
        if(!Cache.retrieve('testing')){ // non siamo in fase di test
            next()
        }
        else{
            //testing
            next(req,res);
        }
    }
}