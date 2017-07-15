const tap = require('tap');
const Token = require('../../utilities/tokenGenerator');
const Cache = require('../../utilities/wrapperCache');
const middleware = require('../tokenHandler');
const httpMocks = require('node-mocks-http');
var token = Token.generateToken();
Cache.setCache(token,'arpho@iol.it')
var res = httpMocks.createResponse();
var req = httpMocks.createRequest();
req.body = {email:'arpho@iol.it'};
req.body.token = token;
var next = () => {
				tap.ok(res.out,'res.out valorizzato');
				tap.end();
		}
middleware(req,res,next);// test token scaduto
