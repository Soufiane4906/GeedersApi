import mongoose from "mongoose";

const GigSchema = new mongoose.Schema(
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
            required: false,
        },
        price: {
            type: Number,
            required: true,
        },
        cover: {
            type: String,
            required: false,
        },
        images: {
            type: [String],
            required: false,
        },
        shortTitle: {
            type: String,
            required: false,
        },
        shortDesc: {
            type: String,
            required: true,
        },
        deliveryTime: {
            type: Number,
            required: false,
        },
        revisionNumber: {
            type: Number,
            required: false,
        },
        features: {
            type: [String],
            required: false,
        },
        sales: {
            type: Number,
            default: 0,
        },
        // Updated languages field with proper reference
        languages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Language'  // This should match the name used when defining the Language model
            }
        ],
        country: {
            type: String,
            required: false,
        },
        city: {
            type: String,
            required: false,
        },
        active: {
            type: Boolean,
            default: true,
        },
        featured: {
            type: Boolean,
            default: false,
        },
        poi: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'POI'  // Référence au modèle POI
            }
        ],
        hasCar: {
            type: Boolean,
            default: false,
        },
        hasScooter: {
            type: Boolean,
            default: false,
        },
        availabilityTimes: {
            type: Object,
            required: false,
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Gig", GigSchema);