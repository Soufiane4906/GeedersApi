import mongoose from "mongoose";

const POISchema = new mongoose.Schema(
    {
            name: { type: String, required: true },
            image: { type: String, required: true }
    },
    { timestamps: true }
);

export default mongoose.model("POI", POISchema);