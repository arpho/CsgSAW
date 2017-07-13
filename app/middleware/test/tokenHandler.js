const tap = require('tap');
const Token = require('../../utilities/tokenGenerator');
const Cache = require('../../utilities/wrapperCache');
const middleware = require('../tokenHandler');
var token = Token.generateToken();
Cache.setCache('arpho@iol.it',token)
var req = {}
var res = {}
req.body = {email:'arpho@iol.it'};
req.body.token = token;
var next = (req,res) => {
    tap.equal(Cache.retrieve('arpho@iol.it'),res.out.token,'il nuovo token è'+ 
    'incluso nella risposta e aggiornato nella cache');
};
middleware(req,res,next)
