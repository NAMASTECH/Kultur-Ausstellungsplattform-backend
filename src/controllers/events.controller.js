
import event from "../model/event.model.js";

const dateSherch = (byDateStart, byDateEnd) => {
  const dateNew = new Date().toISOString().split("T")[0];
  // "2023-10-24T14:34:18z"  .split("T") -> [2023-10-24, 14:34:18z];

  if (byDateStart && byDateEnd) {
    return { $and: [{ dateStart: { $gte: byDateStart } }, { dateEnd: { $gte: byDateEnd } }] };
  } else {
    return byDateStart ? { dateStart: { $gte: byDateStart } } : {dateStart: { $gte: dateNew }};
  }
}

export async function getAllEvents(req, res) {
  const byDateStart = req.query.dateStart;
  const byDateEnd = req.query.dateEnd;
  const byEventCategory = req.query.eventCategory;
  const byEventType = req.query.eventType;
  const page = req.query.page;
  const limit = req.query.limit;

  const startDateFilter = dateSherch(byDateStart, byDateEnd);

  const eventCategoryFilter = byEventCategory ? { eventCategory: byEventCategory } : {};
  const eventTypeFilter = byEventType ? { eventType: byEventType } : {};
  const pageFilter = page ? parseInt(page) : 1;
  const limitFilter = limit ? parseInt(limit) : 10;

  try {
    const events = await event
      .find({
        ...startDateFilter,
        ...eventCategoryFilter,
        ...eventTypeFilter,
      })
      .limit(limitFilter)
      .skip((pageFilter - 1) * limitFilter)
      .populate("venues");

    res.status(200).send( events );
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
}
