import { Router } from "express";
import * as eventController from "../controllers/event.controller.js";
import { validateOrganizerAndAdmin } from "../middlewares/auth.middleware.js";
import validateEvent from "../middlewares/event.middleware.js";

const router = Router();

// Erstelle ein neues event

router.post("/event", validateOrganizerAndAdmin, eventController.createEvent);
router.patch(
  "/event/:id",
  validateOrganizerAndAdmin,
  validateEvent,
  eventController.updateEvent
);
router.delete(
  "/event/:id",
  validateOrganizerAndAdmin,
  eventController.deleteEvent
);
// router.get('/event', eventController.getEvents);
router.get("/event/:id", eventController.getEventById);
// Abfrage aller Events eines Organizers
router.get(
  "/events/organizer/:organizerId",
  eventController.getEventsByOrganizerId
);
// IsAktiv
router.put("/events/deactivate/:id", eventController.deactivateEvent);

export default router;
