var express = require('express');
var router = express.Router();
const EventController = require('../controllers/events');

// Route related to delete events
router.delete('/', EventController.eraseEvents);

module.exports = router;