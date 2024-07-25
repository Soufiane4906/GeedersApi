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
    //age
    //Location
    //Date of birth
    age: {
      type: Date,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },


    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      required: false,
    },
    shortDesc: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
      required: false,
    },
    sales: {
      type: Number,
      default: 0,
    },
    availabilityTimes: {
      type: [String], // Changed to an array of time slots
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
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Gig", GigSchema);
