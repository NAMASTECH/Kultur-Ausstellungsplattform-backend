import Event from "../model/event.model.js";
import Organizer from "../model/organizer.model.js";
import Venue from "../model/venue.model.js";
import Artist from "../model/artist.model.js";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Controller-Funktionen für Events

// Erstelle ein neues Event
export const createEvent = async (req, res) => {
  const token = req.cookies.access_token;
  const decoded = jwt.decode(token, process.env.JWT_SECRET);
  const idOrg = decoded.id;
  const organizerData = await Organizer.findOne({ userId: idOrg });

  console.log(req.body);

  try {
    // Dublettenprüfung bei Venue (unique)
    const {
      eventTitle,
      eventCategory,
      eventType,
      img,
      description,
      homepage,
      dateStart,
      dateEnd,
      timeStart,
      timeEnd,
      venueName,
      venueType,
      city,
      street,
      houseNumber,
      zipCode,
      additionalAddressInfo,
      // artistName,
      // artistType,
      // artistDescription,
      // artistHomepage,
      // artistImg,
    } = req.body;

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

    // let existingArtist = await Artist.findOne({
    //   artistName,
    //   artistType,
    //   artistDescription,
    //   artistHomepage,
    //   artistImg,
    // });

    // if (!existingArtist) {
    //   // Wenn das Venue nicht existiert, erstelle ein neues
    //   existingArtist = new Artist({
    //     artistName,
    //     artistType,
    //     artistDescription,
    //     artistHomepage,
    //     artistImg,
    //   });

    //   existingArtist = await existingArtist.save();
    // }

    const artistDetails = req.body.artists;
    let artistIds = [];

    for (const details of artistDetails) {
      let {
        artistName,
        artistType,
        artistDescription,
        artistHomepage,
        artistImg,
      } = details;

      // TODO: Prüfen, ob wirklich anhand aller Felder gesucht werden soll
      let existingArtist = await Artist.findOne({
        artistName,
        artistType,
      });

      if (!existingArtist) {
        // Wenn Artist nicht existiert, neu erstellen
        existingArtist = new Artist({
          artistName,
          artistType,
          artistDescription,
          artistHomepage,
          artistImg,
        });
        existingArtist = await existingArtist.save();
      }

      artistIds.push(existingArtist._id);
    }

    // Event anlegen
    const newEvent = new Event({
      eventTitle,
      eventType,
      eventCategory,
      img,
      description,
      homepage,
      dateStart: new Date(dateStart),
      dateEnd: new Date(dateEnd),
      timeStart,
      timeEnd,
      organizerId: organizerData._id,
      venues: existingVenue._id,
      artists: artistIds,
    });

    const savedEvent = await newEvent.save();

    res.status(201).json(savedEvent);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Fehler beim Erstellen des Events", error });
  }
};
// Aktualisiere ein vorhandenes Event
export const updateEvent = async (req, res) => {
  const [eventTitle, eventCategory, eventType, img, description, homepage, dateStart, dateEnd, timeStart, timeEnd,] = req.body;
  const [venueName, venueType, city, street, houseNumber, zipCode, additionalAddressInfo,] = req.body;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { eventTitle, eventCategory, eventType, img, description, homepage, dateStart, dateEnd, timeStart, timeEnd },
      { new: true }
    );
    const updatedVenue = await Venue.findByIdAndUpdate(
      updateEvent.venues._id,
      { venueName, venueType, city, street, houseNumber, zipCode, additionalAddressInfo },
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event nicht gefunden" });
    }
    res.json(updatedEvent, updatedVenue);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Fehler beim Aktualisieren des Events", error });
  }
};

// Lösche ein Event
export const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event nicht gefunden" });
    }
    res.json({ message: "Event gelöscht" });
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Löschen des Events", error });
  }
};

// Abfrage aller Events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("venues").populate("artists");
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Abrufen der Events", error });
  }
};

// Abfrage eines einzelnen Events
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("venues")
      .populate("artists");
    if (!event) {
      return res.status(404).json({ message: "Event nicht gefunden" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Abrufen des Events", error });
  }
};

// Abfrage aller Events eines Organizers
export const getEventsByOrganizerId = async (req, res) => {
  const organizerId = req.params.organizerId;
  const page = req.query.page;
  const limit = req.query.limit;

  const pageFilter = parseInt(page) || 1;
  const limitFilter = parseInt(limit) || 10;

  try {
    const events = await Event.find({ organizerId })
    .populate("venues" , "venueName", )
    .select("_id eventTitle dateStart dateEnd updatedAt isActive")
    .limit(limitFilter)
    .skip(limitFilter * (pageFilter - 1))
    .sort({ dateStart: 1, timeStart: 1 })
    ;

    const totalCount = await Event.countDocuments({ organizerId });
    res.json({events, totalCount});
  } catch (error) {
    res.status(500).json({
      message: "Fehler beim Abrufen der Events des Organizers",
      error,
    });
  }
};
export const deactivateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { isActive: false }, // Setze isActive auf false, um das Event zu deaktivieren
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event nicht gefunden" });
    }

    res.json(updatedEvent);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Fehler beim Deaktivieren des Events", error });
  }
};


