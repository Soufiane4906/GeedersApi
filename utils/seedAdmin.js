import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";

dotenv.config();

console.log("MONGO_URI in seedAdmin.js:", process.env.MONGO_URI);

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
    process.exit(1); // Stop execution if MongoDB fails
  }
};

const seedAdmin = async () => {
  await connect(); // Assure la connexion avant de traiter les données

  try {
    const existingAdmin = await User.findOne({ isAdmin: true });
    if (existingAdmin) {
      console.log("⚠️ Admin user already exists.");
      mongoose.connection.close();
      return;
    }

    const hashedPassword = bcrypt.hashSync("admin123", 10);
    const adminUser = new User({
      username: "admin",
      email: "admin@example.com",
      password: hashedPassword,
      isAdmin: true,
      userType: "admin",
      isVerified: true,
    });

    await adminUser.save();
    console.log("✅ Admin user created successfully!");

    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding admin user:", err);
    mongoose.connection.close();
  }
};

seedAdmin();
