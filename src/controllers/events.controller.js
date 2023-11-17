
import  Event  from "../model/event.model.js";
import Artist from "../model/artist.model.js";

const dateSherch = (byDateStart, byDateEnd) => {
  const dateNew = new Date();
  // "2023-10-24T14:34:18z"  .split("T") -> [2023-10-24, 14:34:18z];

  if (byDateStart && byDateEnd) {
    return { $and: [{ dateStart: { $gte: byDateStart } }, { dateStart: { $lte: byDateEnd}  }] };
    
  } else if (byDateStart) {
    const today = new Date(byDateStart.toISOString());
    const nextDay = new Date(today.setDate(today.getDate() + 1));
    return  { $and: [{ dateStart: { $gte: byDateStart } }, { dateStart: { $lte: nextDay}  }] };
  } else {
    return {};
  }
};

export async function getAllEvents(req, res) {
  const byDateStart = req.query.dateStart;
  const byDateEnd = req.query.dateEnd;
  const byEventCategory = req.query.eventCategory;
  const byEventType = req.query.eventType;
  const page = req.query.page;
  const limit = req.query.limit;

  const startDateFilter = dateSherch(byDateStart ? new Date(byDateStart) :  null, byDateEnd ? new Date(byDateEnd) : null);

  const eventCategoryFilter = byEventCategory ? { eventCategory: byEventCategory } : {};
  const eventTypeFilter = byEventType ? { eventType: byEventType } : {};
  const pageFilter = page ? parseInt(page) : {} ;
  const limitFilter = limit ? parseInt(limit) : {};
  
  try {
    const events = await Event
        .find({
          ...startDateFilter,
          // ...eventCategoryFilter,
          ...eventTypeFilter,
        })
        .limit(limitFilter)
        .skip(limitFilter * (pageFilter - 1))
        .populate("venues")
        .populate("artists");

      res.status(200).send( events );
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: error.message,
    });
  }
}

export async function getAllArtists (req, res) {
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