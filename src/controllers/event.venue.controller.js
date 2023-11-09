import Event from "../model/event.model";
import Venue from "../model/venue.model";
// Controller-Funktionen für Events

// Erstelle ein neues Event
export const createEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Erstellen des Events', error });
  }
};

// Aktualisiere ein vorhandenes Event
export const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event nicht gefunden' });
    }
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Aktualisieren des Events', error });
  }
};

// Lösche ein Event
export const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event nicht gefunden' });
    }
    res.json({ message: 'Event gelöscht' });
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Löschen des Events', error });
  }
};

// Abfrage aller Events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Abrufen der Events', error });
  }
};

// Abfrage eines einzelnen Events
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event nicht gefunden' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Abrufen des Events', error });
  }
};

// Controller-Funktionen für Venues

// Erstelle einen neuen Venue
export const createVenue = async (req, res) => {
  try {
    const newVenue = new Venue(req.body);
    const savedVenue = await newVenue.save();
    res.status(201).json(savedVenue);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Erstellen des Venues', error });
  }
};

// Aktualisiere einen vorhandenen Venue
export const updateVenue = async (req, res) => {
  try {
    const updatedVenue = await Venue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedVenue) {
      return res.status(404).json({ message: 'Venue nicht gefunden' });
    }
    res.json(updatedVenue);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Aktualisieren des Venues', error });
  }
};

// Lösche einen Venue
export const deleteVenue = async (req, res) => {
  try {
    const deletedVenue = await Venue.findByIdAndDelete(req.params.id);
    if (!deletedVenue) {
      return res.status(404).json({ message: 'Venue nicht gefunden' });
    }
    res.json({ message: 'Venue gelöscht' });
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Löschen des Venues', error });
  }
};

// Abfrage aller Venues
export const getVenues = async (req, res) => {
  try {
    const venues = await Venue.find();
    res.json(venues);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Abrufen der Venues', error });
  }
};

// Abfrage eines einzelnen Venue
export const getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) {
      return res.status(404).json({ message: 'Venue nicht gefunden' });
    }
    res.json(venue);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Abrufen des Venue', error });
  }
};