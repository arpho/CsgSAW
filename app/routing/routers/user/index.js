const express = require('express');
const router = express.Router();
router.post('/login/',require('../../routers').login);
//TODO creare middleware per autenticazione
router.post('/2BeEnabled/',require('../../user_routing').toBeEnabled)
module.exports = router;
