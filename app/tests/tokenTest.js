'use strict';
var tap = require('tap'),
Token = require('../utilities/tokenGenerator'),
Cache = require('../utilities/wrapperCache');
var token = Token.generateToken();
Cache.setCache(token,'questo è un test')
tap.equal('questo è un test',Cache.retrieve(token),'check token');
Cache.removeToken(token)
tap.notOk(Cache.retrieve(token),'item cache rimosso')
var token2 = Token.generateToken(), mail ='mail@test.it'
Cache.setCache(token2,mail)
var res = Token.renewToken(token2,mail)
console.log('rinnova token',res)
tap.equal(res.valido,true,'token valido')
tap.equal(mail,Cache.retrieve(res.token),'token aggiornato')
tap.notOk(Cache.retrieve(token2),'rimosso vecchio token')
