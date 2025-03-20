import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    gigId: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    AmbassadorId: {
      type: String,
      required: true,
    },
    GuestId: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    payment_intent: {
      type: String,
      required: true,
    },
    totalprice: {
      type: Number,
      required: false,
    },

   //location as string
    location: {
      type: String,
      required: false,
    },
    options: {
      type: {
        car: Boolean,
        scooter: Boolean,
      },
      required: false,
    },
    //hour
    duration: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", OrderSchema);
