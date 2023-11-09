
import event from "../model/event.model.js";

export async function getAllEvents(req, res) {
  const byDateStart = req.query.dateStart;
  const byDateEnd = req.query.dateEnd;
  const byEventCategory = req.query.eventCategory;
  const byEventType = req.query.eventType;
  const page = req.query.page;
  const limit = req.query.limit;

  const startDateFilter = byDateStart ? { dateStart: { $gte: byDateStart } } : {};
  const endDateFilter = byDateEnd ? { dateEnd: { $lte: byDateEnd } } : {};
  const eventCategoryFilter = byEventCategory ? { eventCategory: byEventCategory } : {};
  const eventTypeFilter = byEventType ? { eventType: byEventType } : {};
  const pageFilter = page ? parseInt(page) : 1;
  const limitFilter = limit ? parseInt(limit) : 10;

  try {
    const events = await event
      .find({
        ...startDateFilter,
        ...endDateFilter,
        ...eventCategoryFilter,
        ...eventTypeFilter,
      })
      .limit(limitFilter)
      .skip((pageFilter - 1) * limitFilter);

    res.status(200).send( events );
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
}
