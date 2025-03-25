import mongoose from "mongoose";
import dotenv from "dotenv";
import {Country} from "../models/country.model.js";
import {City} from "../models/country.model.js";

dotenv.config();

const mongoUrl = 'mongodb+srv://soufiane:gogo@cluster0.05omqhe.mongodb.net/v7?retryWrites=true&w=majority&appName=Cluster0';
const strictQuery = process.env.STRICT_QUERY === "true";

mongoose.set("strictQuery", strictQuery);

const connect = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

// Top 30 most visited cities and their countries
const citiesData = [
  { name: "Bangkok", countryName: "Thailand" },
  { name: "Paris", countryName: "France" },
  { name: "London", countryName: "United Kingdom" },
  { name: "Dubai", countryName: "United Arab Emirates" },
  { name: "Singapore", countryName: "Singapore" },
  { name: "Kuala Lumpur", countryName: "Malaysia" },
  { name: "New York", countryName: "United States" },
  { name: "Istanbul", countryName: "Turkey" },
  { name: "Tokyo", countryName: "Japan" },
  { name: "Antalya", countryName: "Turkey" },
  { name: "Seoul", countryName: "South Korea" },
  { name: "Osaka", countryName: "Japan" },
  { name: "Makkah", countryName: "Saudi Arabia" },
  { name: "Phuket", countryName: "Thailand" },
  { name: "Pattaya", countryName: "Thailand" },
  { name: "Milan", countryName: "Italy" },
  { name: "Barcelona", countryName: "Spain" },
  { name: "Bali", countryName: "Indonesia" },
  { name: "Hong Kong", countryName: "China" },
  { name: "Taipei", countryName: "Taiwan" },
  { name: "Rome", countryName: "Italy" },
  { name: "Amsterdam", countryName: "Netherlands" },
  { name: "Agra", countryName: "India" },
  { name: "Delhi", countryName: "India" },
  { name: "Shanghai", countryName: "China" },
  { name: "Beijing", countryName: "China" },
  { name: "Mumbai", countryName: "India" },
  { name: "Rio de Janeiro", countryName: "Brazil" },
  { name: "Cairo", countryName: "Egypt" },
  { name: "Los Angeles", countryName: "United States" }
];

const seedCountriesAndCities = async () => {
  await connect();

  try {
    const countryMap = {};

    // Insert unique countries
    for (const city of citiesData) {
      if (!countryMap[city.countryName]) {
        let country = await Country.findOne({ name: city.countryName });

        if (!country) {
          country = new Country({ name: city.countryName });
          await country.save();
          console.log(`✅ Country added: ${city.countryName}`);
        } else {
          console.log(`⚠️ Country already exists: ${city.countryName}`);
        }

        countryMap[city.countryName] = country._id;
      }
    }

    // Insert cities
    for (const city of citiesData) {
      let existingCity = await City.findOne({ name: city.name });

      if (!existingCity) {
        const newCity = new City({
          name: city.name,
          country: countryMap[city.countryName]
        });
        await newCity.save();
        console.log(`✅ City added: ${city.name}`);
      } else {
        console.log(`⚠️ City already exists: ${city.name}`);
      }
    }

    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding countries and cities:", err);
    mongoose.connection.close();
  }
};

seedCountriesAndCities();
