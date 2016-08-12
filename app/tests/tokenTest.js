'use strict';
var tap = require('tap'),
Token = require('../utilities/tokenGenerator'),
Cache = require('../utilities/wrapperCache');

var token = Token.generateToken();
Cache.setCache(token,'questo è un test')
tap.equal('questo è un test',Cache.retrieve(token),'check token');
Cache.removeToken(token)
tap.notOk(Cache.retrieve(token),'item cache rimosso')
