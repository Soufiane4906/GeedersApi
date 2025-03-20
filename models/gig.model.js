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
    totalStars: {
      type: Number,
      default: 0,
    },
      city: {
          type: String,
          required: true,
      },
      country: {
          type: String,
          required: true,
      },
    starNumber: {
      type: Number,
      default: 0,
    },

    cover: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: false,
    },
    images: {
      type: [String],
      required: false,
    },
    sales: {
      type: Number,
      default: 0,
    },
    availabilityTimes: {
      type: [String],
      required: true,
    },
    hasCar: {
      type: Boolean,
      default: false,
    },
    carPrice: {
      type: Number,
      required: function() {
        return this.hasCar;
      },
    },
    hasScooter: {
      type: Boolean,
      default: false,
    },
    scooterPrice: {
      type: Number,
      required: function() {
        return this.hasScooter;
      },
    },
    poi: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Gig", GigSchema);
