const express = require('express');
const router = express.Router();
router.get('/', function(req, res) {
        res.sendFile('index.html',{root:path.join(__dirname,'../../../public')});//setto il root alla cartella public
    });
module.exports = router;
