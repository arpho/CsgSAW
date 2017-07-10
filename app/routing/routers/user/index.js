const express = require('express');
const router = express.Router();
router.post('/login',require('../../routers').login);
module.exports = router;
