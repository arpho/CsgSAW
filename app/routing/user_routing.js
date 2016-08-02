'use strict';
module.exports = {

    crea: function(req,res) {
    console.log(req)
    //creo il valore salt per l'utente
    var crypto = require("crypto-js"),salt = crypto.lib.WordArray.random(128/8),
    key512Bits1000Iterations = crypto.PBKDF2("Secret Passphrase", salt, { keySize: 512/32, iterations: 1000 });
    res.send({msg:'ok',salt:salt,key512Bits1000Iterations})
    }
}

