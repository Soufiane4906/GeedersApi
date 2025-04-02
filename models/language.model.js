import mongoose from "mongoose";

const LanguageSchema = new mongoose.Schema(
    {
        langue: {
            type: String,
            required: true,
        },
        flag: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true,
    }
);

export const Language = mongoose.model("Language", LanguageSchema);