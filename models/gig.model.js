import mongoose from "mongoose";
const { Schema } = mongoose;

const GigSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        totalStars: {
            type: Number,
            default: 0,
        },
        starNumber: {
            type: Number,
            default: 0,
        },
        cat: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        cover: {
            type: String,
            required: true,
        },
        images: {
            type: [String],
            default: [],
        },
        shortTitle: {
            type: String,
            required: true,
        },
        shortDesc: {
            type: String,
            required: true,
        },
        deliveryTime: {
            type: Number,
            required: true,
        },
        revisionNumber: {
            type: Number,
            required: true,
        },
        features: {
            type: [String],
            default: [],
        },
        sales: {
            type: Number,
            default: 0,
        },
        active: {
            type: Boolean,
            default: true,
        },
        featured: {
            type: Boolean,
            default: false,
        },
        country: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Gig", GigSchema);
