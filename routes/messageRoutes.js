const express = require('express');
const messageController = require('../controllers/messageController');

const router = express.Router();

router.post('/schedule', messageController.scheduleMessage);

module.exports = router;
