import { Schema, model } from "mongoose";

// definere DB Schema for organizer
const organizerSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      cast: false,
    },
    lastname: {
      type: String,
      required: true,
      cast: false,
    },
    organization: {
      type: String,
      required: true,
      cast: false,
    },
    isValid: {
      type: Boolean,
      required: true,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Organizer = model("organizer", organizerSchema);

export default Organizer;
