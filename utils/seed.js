import mongoose from "mongoose";
import { Country, City, TouristPlace } from "../models/country.model.js";
import dotenv from "dotenv";

dotenv.config();

const sampleData = [
  {
    name: "USA",
    cities: [
      {
        name: "New York",
        touristPlaces: [
          { name: "Statue of Liberty", description: "Iconic national monument" },
          { name: "Central Park", description: "Urban park in NYC" },
        ],
      },
      {
        name: "Los Angeles",
        touristPlaces: [
          { name: "Hollywood Sign", description: "Famous landmark" },
          { name: "Santa Monica Pier", description: "Popular pier" },
        ],
      },
    ],
  },
  {
    name: "France",
    cities: [
      {
        name: "Paris",
        touristPlaces: [
          { name: "Eiffel Tower", description: "Iconic tower in Paris" },
          { name: "Louvre Museum", description: "World's largest art museum" },
        ],
      },
      {
        name: "Nice",
        touristPlaces: [
          { name: "Promenade des Anglais", description: "Famous walkway" },
          { name: "Castle Hill", description: "Historic hilltop park" },
        ],
      },
    ],
  },
];

const seedDatabase = async () => {
  try {
    mongoose.connect("mongodb+srv://soufiane:gogo@cluster0.05omqhe.mongodb.net/v3?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Country.deleteMany({});

    for (const countryData of sampleData) {
      const country = new Country({ name: countryData.name });

      for (const cityData of countryData.cities) {
        const city = new City({ name: cityData.name });

        for (const touristPlaceData of cityData.touristPlaces) {
          const touristPlace = new TouristPlace(touristPlaceData);
          city.touristPlaces.push(touristPlace);
        }

        country.cities.push(city);
      }

      await country.save();
    }

    console.log("Database seeded successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding database:", err);
    mongoose.connection.close();
  }
};

seedDatabase();
