const user = require('../models/User');
const Token = require('../utilities/tokenGenerator');
const Cache = require('../utilities/wrapperCache');
module.exports = (req,res,next)=>{

    const token = req.body.token;
    const email = req.body.email;
    check = Token.renewToken(token,email);
    if(!check.valido){
        res.error(400,);// token scaduto
    }
    else{
            res.out = {};
            res.out.token = check.token;
	    console.log('res.out',res.out);
            next();
    }
}
