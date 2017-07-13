user = require('../models/User');
Token = require('../utilities/tokenGenerator');
module.exports = (req,res,next)=>{

    const token = req.body.token;
    const email = req.body.email;
    console.log(token,email);
    check = Token.renewToken(token,email)
}