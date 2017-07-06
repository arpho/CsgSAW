'use strict';
/*
realizza un singletone con funzioni di cache di sistema, per fare ciò questo modulo deve essere richiesto sempre e
 soltanto da un wrapper che funziona da punto di accesso per tutti gli altri moduli del progetto

*/

var NodeCache = require( "node-cache" );
var myCache = new NodeCache( { stdTTL: 7200, checkperiod: 7400 } );// cache con ttl di due ore e checkPeriod di 7400 secondi
module.exports = myCache