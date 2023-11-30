import { Schema, model } from "mongoose";

const venueSchema = new Schema(
	{
		venueName: { type: String, required: true, cast: false, },
		venueType: { type: String, required: true, cast: false, },
		city: { type: String, required: true, cast: false, },
		street: { type: String, required: true, cast: false, },
		houseNumber: { type: String, required: true, cast: false, },
		zipCode: { type: String, required: true, cast: false, },
		additionalAddressInfo: { type: String, cast: false, },
	},
	{ timestamps: false, versionKey: false }
);

const Venue = model("venue", venueSchema);

export default Venue;