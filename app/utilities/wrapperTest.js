/*
saerve per testare il funzionamento da singletone della cache, verifica che richiedendo wrapperCache da due percorsi differenti, si referenzia la stessa cache
*/
wrapperCache = require('./wrapperCache')

module.exports = {
    setCache : wrapperCache.setCache,
    retrieve : wrapperCache.retrieve
}