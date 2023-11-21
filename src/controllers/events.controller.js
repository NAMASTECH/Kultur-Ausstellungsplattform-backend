import Event from "../model/event.model.js";
import Artist from "../model/artist.model.js";

const searchByDate = (byDateStart, byDateEnd) => {
  const dateNew = new Date();
  // "2023-10-24T14:34:18z"  .split("T") -> [2023-10-24, 14:34:18z];

  if (byDateStart && byDateEnd) {
    return {
      $and: [
        { dateStart: { $gte: byDateStart } },
        { dateStart: { $lte: byDateEnd } },
      ],
    };
  } else if (byDateStart) {
    const today = new Date(byDateStart.toISOString());
    const nextDay = new Date(today.setDate(today.getDate() + 1));
    return {
      $and: [
        { dateStart: { $gte: byDateStart } },
        { dateStart: { $lte: nextDay } },
      ],
    };
  } else {
    return { dateEnd: { $gte: new Date(dateNew.toISOString().split("T")[0]) } };
  }
};

export async function getAllEvents(req, res) {
  const byDateStart = req.query.dateStart;
  const byDateEnd = req.query.dateEnd;
  const byVenueType = req.query.venueType;
  const byEventType = req.query.eventType;
  const page = req.query.page;
  const limit = req.query.limit;

  const startDateFilter = searchByDate(
    byDateStart ? new Date(byDateStart) : null,
    byDateEnd ? new Date(byDateEnd) : null
  );

  const eventVenueType = byVenueType && byVenueType !== "All" ? { "venues.venueType": byVenueType } : {};
  const eventTypeFilter = byEventType && byEventType !== "All" ? { eventType: byEventType } : {};
  const pageFilter = page ? parseInt(page) : 1 ;
  const limitFilter = limit ? parseInt(limit) : 10;
  
  try {
    const events = await Event.aggregate([
      {
        $lookup: {
          from: "venues",
          localField: "venues",
          foreignField: "_id",
          as: "venues",
        },
      },
      {
        $lookup: {
          from: "artists",
          localField: "artists",
          foreignField: "_id",
          as: "artists",
        },
      }, 
      {
        $match: {
          ...startDateFilter,
          ...eventVenueType,
          ...eventTypeFilter,
        },
      },
      {
        $lookup: {
          from: "organizers",
          localField: "organizerId",
          foreignField: "_id",
          as: "organizer",
        },
      },
      {
        $sort: {
          dateStart: 1,
          timeStart: 1,
        },
      },
      {
        $facet: {
          events: [
            { $skip: limitFilter * (pageFilter - 1) },
            { $limit: limitFilter },
          ],
          totalCount: [
            {
              $count: "count",
            },
          ],
        },
      },
    ]);
    
    res.status(200).send(events[0]);

  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: error.message,
    });
  }
}

export async function getAllArtists(req, res) {
  try {
    const artists = await Artist.find();
    res.status(200).send(artists);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: error.message,
    });
  }
}
