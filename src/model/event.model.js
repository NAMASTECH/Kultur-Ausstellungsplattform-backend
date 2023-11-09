import { Schema, model } from "mongoose";

// definere DB Schema for Event

const eventSchema = new Schema(
    {
        title: {
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
        dateStart: {
            type: Date,
            required: true,
            cast: false,
        },
        dateEnd: {
            type: Date,
            required: true,
            cast: false,
        },
        timeStart: {
            type: String,
            required: true,
            cast: false,
        },
        timeEnd: {
            type: String,
            required: true,
            cast: false,
        },
        venueName: {
            type: String,
            required: true,
            cast: false,
        },
        venueType:{
            type: String,
            required: true,
            cast: false,
        },
        city: {
            type: String,
            required: true,
            cast: false,
        },
        street: {
            type: String,
            required: true,
            cast: false,
        },
        houseNumber: {
            type: String,
            required: true,
            cast: false,
        },
        additionalAddressInfo: {
            type: String,
            cast: false,
        },
        
        zipCode: {
            type: String,
            required: true,
            cast: false,
        },
        country: {
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