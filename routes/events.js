var express = require('express');
var router = express.Router();
const EventController = require('../controllers/events');

// Routes related to event
router.post('/', EventController.addEvent);
router.get('/', EventController.getAllEvents);
router.get('/actors/:actorId', EventController.getByActor);


module.exports = router;