import Ajv from "ajv";

const ajv = new Ajv();

const eventSchema = {
  type: "object",
  properties: {
    eventTitle: { type: "string", minLength: 3, maxLength: 100 },
    eventType: { type: "string", minLength: 3, maxLength: 100 },
    // img: { type: "string", format: "uri" },
    // eventCategory: { type: "string", minLength: 3, maxLength: 100 },
    description: { type: "string", minLength: 3 },
    // homepage: { type: "string", format: "uri" },
    dateStart: { type: "string" /* format: "date" */ },
    dateEnd: { type: "string" /* format: "date" */ },
    timeStart: { type: "string", pattern: "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$" },
    timeEnd: { type: "string", pattern: "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$" },
    venueName: { type: "string", minLength: 3, maxLength: 100 },
    venueType: { type: "string", minLength: 3, maxLength: 100 },
    city: { type: "string", minLength: 3, maxLength: 100 },
    street: { type: "string", minLength: 3, maxLength: 100 },
    houseNumber: { type: "string", minLength: 1, maxLength: 10 },
    additionalAddressInfo: { type: "string" }, // Empty string allowed
    zipCode: { type: "string", minLength: 3, maxLength: 10 },
    artists: {
      type: "array",
      items: {
        type: "object",
        properties: {
          _id: { type: "string" },
          artistName: { type: "string", minLength: 1 },
          artistType: { type: "string" }, // minLength not needed if it can be empty
          artistDescription: { type: "string" },
          // artistHomepage: { type: "string", format: "uri" },
          // artistImg: { type: "string", format: "uri" },
        },
        required: ["artistName"],
        additionalProperties: true,
      },
      minItems: 1,
    },
  },
  required: [
    "eventTitle",
    "eventType",
    // "img",
    "description",
    // "homepage",
    "dateStart",
    "dateEnd",
    "timeStart",
    "timeEnd",
    "venueName",
    "venueType",
    "city",
    "street",
    "houseNumber",
    "zipCode",
    "artists",
  ],
  additionalProperties: true,
};

const validateEvent = (req, res, next) => {
  console.log(req.body);
  const validate = ajv.compile(eventSchema);
  const valid = validate(req.body);
  if (!valid) {
    return res.status(400).json({
      message: "Bad request",
      errors: validate.errors,
    });
  }
  next();
};

export default validateEvent;
