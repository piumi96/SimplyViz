const express = require('express');
const router = express.Router();

const controller = require('./controller');

router.get('/api/', controller.getCode);

module.exports = router;