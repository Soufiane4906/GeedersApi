import mongoose from "mongoose";
const { Schema } = mongoose;

const touristPlaceSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
});

const citySchema = new Schema({
  name: { type: String, required: true },
  touristPlaces: [touristPlaceSchema],
});

const countrySchema = new Schema({
  name: { type: String, required: true },
  cities: [citySchema],
});

export const TouristPlace = mongoose.model("TouristPlace", touristPlaceSchema);
export const City = mongoose.model("City", citySchema);
export const Country = mongoose.model("Country", countrySchema);
