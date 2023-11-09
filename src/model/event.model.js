import { Schema, model } from "mongoose";

// definere DB Schema for Event

const eventSchema = new Schema(
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

const Event = model("event", eventSchema);

export default Event;