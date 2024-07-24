import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
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
    required: true,
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
  isSeller: {
    type: Boolean,
    default:false
  },
  //add more input forr image recto and verso and passeport
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
  //add field is acoount complete and verified
  isComplete: {
    type: Boolean,
    default:false
  },
  isVerified: {
    type: Boolean,
    default:false
  },
  //has car
  hasCar: {
    type: Boolean,
    required: false,
  },
  //has scooter
  hasScooter: {
    type: Boolean,
    required: false,
  },
  //car price
  carPrice: {
    type: Number,
    required: false,
  },
  //scooter price
  scooterPrice: {
    type: Number,
    required: false,
  },
  //add price
  price: {
    type: Number,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  availabilityDays: {
    type: [String],
    required: false,
  },
  availabilityHours: {
    type: [String],
    required: false,
  },
},{
  timestamps:true
});

export default mongoose.model("User", userSchema)