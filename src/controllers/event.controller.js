import Event from "../model/event.model.js";
import organizer from "../model/organizer.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import Venue from "../model/venue.model.js";
// Controller-Funktionen für Events

// Erstelle ein neues Event
export const createEvent = async (req, res) => {
  
  const token = req.cookies.access_token;
  const decoded = jwt.decode(token, process.env.JWT_SECRET);
  const idOrg = decoded.id;
  const organizerData = await organizer.findOne({userId: idOrg});

  

  try {
    // Dublettenprüfung bei Venue (unique)
    const { eventTitle, eventCategory, eventType, img, description, homepage, dateStart, dateEnd, timeStart, timeEnd, venueName, venueType, city, street, houseNumber, zipCode, additionalAddressInfo, artist} = req.body;

    // Überprüfe, ob ein Venue mit den gleichen Werten bereits existiert
    let existingVenue = await Venue.findOne({
      venueName,
      venueType,
      city,
      street,
      houseNumber,
      zipCode,
    });

    // Wenn das Venue bereits existiert, wiederverwende es
    if (!existingVenue) {
      // Wenn das Venue nicht existiert, erstelle ein neues
      existingVenue = new Venue({
        venueName,
        venueType,
        city,
        street,
        houseNumber,
        additionalAddressInfo,
        zipCode,
      });

      existingVenue = await existingVenue.save();
    }

    // Event anlegen
    const newEvent = new Event({
      eventTitle,
      artist,
      eventType,
      eventCategory,
      img,
      description,
      homepage,
      dateStart,
      dateEnd,
      timeStart,
      timeEnd,
      organizerId: organizerData._id,
      venues: existingVenue._id,
    });

    const savedEvent = await newEvent.save();

    res.status(201).json(savedEvent);
  } catch (error) {
    console.log(error);
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
