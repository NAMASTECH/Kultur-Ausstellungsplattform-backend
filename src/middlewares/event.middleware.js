import ajv from "ajv";

const eventSchema = new ajv.Schema({
    type: "object",
    propertis : {
        eventTitle: { type: "string", minLength: 3, maxLength: 30 },
        artist: { type: "string", minLength: 3, maxLength: 30 },
        eventType: { type: "string", minLength: 3, maxLength: 30 },
        eventCategory: { type: "string", minLength: 3, maxLength: 30 },
        img: { type: "string", minLength: 3, maxLength: 3000 },
        description: { type: "string", minLength: 3, maxLength: 3000 },
        homePage: { type: "string", minLength: 3, maxLength: 3000 },
        dateStart: { type: "string", minLength: 3, maxLength: 30 },
        dateEnd: { type: "string", minLength: 3, maxLength: 30 },
        timeStart: { type: "string", minLength: 3, maxLength: 30 },
        timeEnd: { type: "string", minLength: 3, maxLength: 30 },
        venueName: { type: "string", minLength: 3, maxLength: 30 },
        venueType: { type: "string", minLength: 3, maxLength: 30 },
        city: { type: "string", minLength: 3, maxLength: 30 },
        street: { type: "string", minLength: 3, maxLength: 30 },
        houseNumber: { type: "string", minLength: 3, maxLength: 30 },
        additionalAddressInfo: { type: "string", minLength: 3, maxLength: 30 },
        zipCode: { type: "string", minLength: 3, maxLength: 30 },
    },
    required: ["eventTitle", "artist", "eventType", "eventCategory", "img", "description", "homePage", "dateStart", "dateEnd", "timeStart", "timeEnd", "venueName", "venueType", "city", "street", "houseNumber", "additionalAddressInfo", "zipCode"],
    additionalProperties: false,
});


export const validateEvent = (req, res, next) => {
    const valid = eventSchema.validate(req.body);
    if (!valid) {
        return res.status(400).json({
            message: "Bad request",
            errors: eventSchema.errors,
        });
    }
    next();
}