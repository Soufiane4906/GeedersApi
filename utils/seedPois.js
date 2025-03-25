import mongoose from 'mongoose';
import dotenv from 'dotenv';
import POI from '../models/poi.model.js';
import { pointsOfInterestOptions } from './options.js';

dotenv.config();

const seedPOIs = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb+srv://soufiane:gogo@cluster0.05omqhe.mongodb.net/v7?retryWrites=true&w=majority&appName=Cluster0');
    console.log('Connected to MongoDB');

    // Drop the existing POI collection
    await POI.collection.drop();
    console.log('Existing POI collection dropped');

    // Create seed data
    const poisToSeed = pointsOfInterestOptions.map(option => ({
      name: option.name,
      image: option.icon
    }));

    // Insert seed data
    const seedResult = await POI.insertMany(poisToSeed);

    console.log(`Seeded ${seedResult.length} POIs successfully`);

    // Close the connection
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding POIs:', error);
    process.exit(1);
  }
};

// Run the seed script
seedPOIs();