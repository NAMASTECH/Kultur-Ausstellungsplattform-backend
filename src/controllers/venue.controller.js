
import Venue from "../model/venue.model";

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