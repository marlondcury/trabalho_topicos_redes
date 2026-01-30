const express = require('express');
const router = express.Router();
const EventsController = require('../controllers/eventsController');


router.get('/health', (req, res) => res.json({'status': 'Api rodando!'}));

//rota de cadastro

router.post('/events', EventsController.createEvent);

router.get('/events', EventsController.getAllEvents);

router.get('/events/:id', EventsController.getEventById);

router.put('/events/:id', EventsController.updateEvent);

router.delete('/events/:id', EventsController.deleteEvent);

module.exports = router;