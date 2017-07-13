const tap = require('tap');
const Token = require('../../utilities/tokenGenerator');
const Cache = require('../../utilities/wrapperCache');
const middleware = require('../tokenHandler');
var token = Token.generateToken();
Cache.setCache(token,'arpho@iol.it')
Cache.setCache('testing',true) // setto l'ambiente di test
var req = {}
var res = {}
req.body = {email:'arpho@iol.it'};
req.body.token = token;
var next = (req,res) => {
    console.log('next')
    tap.equal(Cache.retrieve(res.out.token),'arpho@iol.it',' token ')
};
middleware(req,res,next)
res.error = (txt) => {
    tap.equal(txt,'token scaduto');
}
middleware(req,res);// test token scaduto