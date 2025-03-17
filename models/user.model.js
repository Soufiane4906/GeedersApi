import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false, // Changed from true to match your simplified form
  },
  languages: {
    type: [String],
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  customCity: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  desc: {
    type: String,
    required: false,
  },
  isSeller: {
    type: Boolean,
    default: false
  },
  isAmbassador: {
    type: Boolean,
    default: false
  },
  imgRecto: {
    type: String,
    required: false,
  },
  imgVerso: {
    type: String,
    required: false,
  },
  imgPassport: {
    type: String,
    required: false,
  },
  isComplete: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  accountNumber: {
    type: String,
    required: false,
  },
  paymentMethod: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
}, {
  timestamps: true
});

export default mongoose.model("User", userSchema);
