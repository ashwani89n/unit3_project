import express from 'express'
import path from 'path'
import EventsController from '../controllers/events.js'

import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const eventsRoutes = express.Router()

eventsRoutes.get('/events', EventsController.getEvents)

eventsRoutes.get('/events/locations/:id', EventsController.getEventsById);

eventsRoutes.get('/events/:id', EventsController.getEventsByEventsId);

export default eventsRoutes;    