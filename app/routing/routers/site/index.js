const express = require('express');
const router = express.Router();
router.get('/', function(req, res) {
	console.log('home page');
        res.sendFile('index.html',{root:path.join(__dirname,'../../../public')})//setto il root alla cartella public
    });
router.get('hello/:name', (req,res) =>{
	res.send('hello ' + req.params.name + '!')
});
console.log('site routing initialized');
module.exports = router;
