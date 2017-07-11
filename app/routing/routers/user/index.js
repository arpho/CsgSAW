const express = require('express');
const router = express.Router();
router.post('/login/',require('../../routers').login);
//TODO creare middleware per autenticazione
module.exports = router;
