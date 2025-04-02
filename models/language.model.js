import mongoose from "mongoose";
const { Schema } = mongoose;

const languageSchema = new Schema({
    langue: { type: String, required: true },
    flag: { type: String, required: true }
});

export const Language = mongoose.model("Language", languageSchema);
