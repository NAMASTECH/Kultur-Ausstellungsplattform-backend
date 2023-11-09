import { Router } from "express";

// Importiere alle exports aus dem events-Controller als ein Objekt 'eventsController'
import * as eventsController from '../controllers/events.controller.js';

// Instanziiere neuen Router
const router = Router();

// Definiere Endpoints für eventsRouter
router.get('/events', eventsController.getAllEvents);

export default router;