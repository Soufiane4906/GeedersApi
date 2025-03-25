import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import countryRoutes from "./routes/country.route.js";
import adminUsersRoutes from "./routes/adminUsers.route.js";
import adminOrdersRoutes from "./routes/adminOrders.route.js"; // Import the new admin orders route
import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path';
import os from 'os';
import cityRoutes from "./routes/city.route.js";
import poiRoutes from "./routes/poi.route.js";

import adminRoute from "./routes/admin.route.js";
import gigRoute from "./routes/gig.route.js";

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();

const mongoUrl = process.env.MONGO_URI;
const nodeEnv = process.env.NODE_ENV || 'development';
const strictQuery = process.env.STRICT_QUERY === 'true';
const port = process.env.PORT || 8800;

mongoose.set('strictQuery', strictQuery);

const connect = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};

const allowedOrigins = ['https://www.blablatrip.com', 'http://localhost:5174','http://localhost:5173'];
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
app.use("/api/cities", cityRoutes);
app.use("/api/admin", adminRoute);
app.use("/api/pois", poiRoutes);
app.use("/api/adminUsers", adminUsersRoutes);
app.use("/api/adminOrders", adminOrdersRoutes); // Add the new admin orders route
app.get("/helo", (req, res) => {
  res.send("Hello, your server is running!");
});

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).send(errorMessage);
});

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
  return 'localhost';
};

const serverIpAddress = getServerIpAddress();

app.listen(port, () => {
  connect();
  console.log(`Backend server is running in ${nodeEnv} mode on port ${port}!`);
  console.log(`Server URL: http://${serverIpAddress}:${port}`);
});