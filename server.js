import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import countryRoutes from "./routes/country.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path';
import os from 'os'; // Import the 'os' module to get network interfaces
dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI); // Ajoute cette ligne pour voir si la variable est chargée


const app = express();


const mongoUrl = process.env.MONGO_URI;
const nodeEnv = process.env.NODE_ENV || 'development';
const strictQuery = process.env.STRICT_QUERY === 'true'; // Convert string to boolean
const port = process.env.PORT || 8800; // Use PORT from .env or default to 8800

mongoose.set('strictQuery', strictQuery);

const connect = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};

const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/countries", countryRoutes);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).send(errorMessage);
});

// Function to get the server's IP address
const getServerIpAddress = () => {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    const interfaceDetails = interfaces[interfaceName];
    for (const detail of interfaceDetails) {
      if (detail.family === 'IPv4' && !detail.internal) {
        return detail.address;
      }
    }
  }
  return 'localhost'; // Fallback to localhost if no IP is found
};

const serverIpAddress = getServerIpAddress();

app.listen(port, () => {
  connect();
  console.log(`Backend server is running in ${nodeEnv} mode on port ${port}!`);
  console.log(`Server URL: http://${serverIpAddress}:${port}`);
});