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
    required: function() { return this.isAmbassador; }, // Obligatoire seulement pour les ambassadeurs
  },
  languages: {
    type: [String], // Array of strings
    required: false,
  },
  city: {
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
  isAmbassador: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  userType: {
    type: String,
    enum: ['guest', 'ambassador', 'admin'],
    default: 'guest'
  },
  // Images for verification
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
  // Account status fields
  isComplete: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  age: {
    type: String,
    required: false,
  },
  accountNumber: {
    type: String,
    required: false,
  },
  paymentMethod: {
    type: String,
    required: false,
  },
}, {
  timestamps: true
});

export default mongoose.model("User", userSchema)