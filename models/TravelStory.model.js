import mongoose from "mongoose";
const { Schema } = mongoose;

const travelStorySchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    title: {
        type: String,
        required: [true, "Story title is required"],
        trim: true,
    },
    location: {
        type: String,
        required: [true, "Location is required"],
        trim: true,
    },
    ambassadorName: {
        type: String,
        required: [true, "Ambassador name is required"],
        trim: true,
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        enum: [
            "adventure",
            "food",
            "nightlife",
            "history",
            "nature",
            "spiritual",
            "shopping",
            "family",
            "other",
        ],
    },
    date: {
        type: Date,
        required: [true, "Date of experience is required"],
    },
    content: {
        type: String,
        required: [true, "Story content is required"],
        trim: true,
        minlength: [50, "Story should be at least 50 characters long"],
    },
    imageUrl: {
        type: String,
        default: null,
    },
    snippet: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "approved",
    },
}, { timestamps: true });

// Create a snippet from the content before saving
travelStorySchema.pre("save", function (next) {
    if (this.isModified("content") || !this.snippet) {
        this.snippet = this.content.substring(0, 150).trim();
        if (this.content.length > 150) {
            this.snippet += "...";
        }
    }
    next();
});

export default mongoose.model("TravelStory", travelStorySchema);
