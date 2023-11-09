import { Schema, model } from "mongoose";

// definere DB Schema for Event

const eventSchema = new Schema(
<<<<<<< HEAD
  {
    eventTitle: { type: String, required: true, cast: false, },
    artist: { type: String, required: true, cast: false, },
    eventCategory: { type: String, required: true, default: "Kunst", cast: false, },
    eventType: { type: String, required: true, cast: false, },
    img: { type: String,  required: true, cast: false, },

    description: { type: String, required: true, cast: false, },
    homepage: { type: String, required: true, cast: false, },
    dateStart: { type: Date, required: true, cast: false, },
    dateEnd: { type: Date, required: true, cast: false, },
    timeStart: { type: String, required: true, cast: false, },
    timeEnd: { type: String, required: true, cast: false, },
    venueName: { type: String, required: true, cast: false, },
    venueType: { type: String, required: true, cast: false, },
    venues: [{
      city: { type: String, required: true, cast: false, },
      street: {  type: String, required: true, cast: false, },
      houseNumber: { type: String, required: true, cast: false, },
      additionalAddressInfo: { type: String, cast: false, },
      zipCode: { type: String,  required: true, cast: false, },
    }],
    organizerId: { type: Schema.Types.ObjectId, ref: "organizer", required: true, unique: true, },
  },
  { timestamps: true, versionKey: false }
);
=======
    {
        eventTitle: {
            type: String,
            required: true,
            cast: false,
        },
        artist: {
            type: String,
            required: true,
            cast: false,
        },
        eventCategory: {
            type: String,
            required: true,
            default: "Kunst",
            cast: false,
        },
        eventType: {
            type: String,
            required: true,
            cast: false,
        },
        img: {
            type: String,
            required: true,
            cast: false,
        },
    
        description: {
            type: String,
            required: true,
            cast: false,
        },
        homepage: {
            type: String,
            required: true,
            cast: false,
        },
        organizerId: {
            type: Schema.Types.ObjectId,
            ref: "organizer",
            required: true,
            unique: true,
        },
    },
    { timestamps: true, versionKey: false }
    );
>>>>>>> 54f403f83e7a54311ca9f3f3f193611809e44122

const Event = model("event", eventSchema);

export default Event;
