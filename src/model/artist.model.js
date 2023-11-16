import { Schema, model } from "mongoose";

const artistsSchema = new Schema(
    {
        artistName: { type: String, required: true, cast: false, },
        artistType: { type: String, cast: false, },
        artistDescription: { type: String, cast: false, },
        artistHomepage: { type: String, cast: false, },
        artistImg: { type: String, cast: false, },
    },
    { timestamps: false, versionKey: false }
    );

    const Artist = model("artist", artistsSchema);

    export default Artist;