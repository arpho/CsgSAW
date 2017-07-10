t express = require('express');
const router = express.Router();
router.post('/file',require('../../routers').login);
module.exports = router;
