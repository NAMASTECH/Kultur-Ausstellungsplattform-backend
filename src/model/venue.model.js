import { Schema, model } from "mongoose";
// Define DB Schema for Event

const venueSchema = new Schema(
	{
		"venueName": {
		    type: String,
		    required: true,
		    cast: false, 
		 },                       
		 "venueType": {
		    type: String,
		    required: true,
		    cast: false, 
		 },
		 "city": {
		    type: String,
		    required: true,
		    cast: false, 
		 },
		 "street": {
		    type: String,
		    required: true,
		    cast: false, 
		 },
		 "houseNumber": {
		    type: String,
		    required: true,
		    cast: false, 
		 },
		 // Zusatzinfos
		 "additionalAddressInfo": {
		    type: String,
		    cast: false, 
		 }, 
		// Postleitzahl        
		 "ZIP-Code": {
		    type: String,
		    required: true,
		    cast: false, 
		 }, 
	}, 
	{timestamps: true, versionKey: false}
);

// Erstelle Model-Instanz für Venue-Collection
const Venue = model("venue", venueSchema);

export default Venue;