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
import countryRoutes from "./routes/country.route.js"; // Correctly import this
import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path';
import https from 'https';
import fs from 'fs';

// Initialize app and dotenv
const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

// MongoDB connection
const connect = async () => {
  try {
    await mongoose.connect("mongodb+srv://soufiane:gogo@cluster0.05omqhe.mongodb.net/v7?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};

// CORS configuration
const allowedOrigins = [
  'https://www.blablatrip.com',
  'https://blablatrip.com',
  'https://www.blablatrip.com',
  'http://105.75.240.99:5174',
  'http://localhost:5174',
  'http://localhost:5173', // Optional, for local development
];

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

// Serve static files from the React app
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'dist')));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/countries", countryRoutes);

// Catch-all route to serve the React app's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handler
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).send(errorMessage);
});

// SSL certificates
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/blablatrip.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/blablatrip.com/fullchain.pem'),
};

// Start HTTPS server
https.createServer(options, app).listen(8800, () => {
  connect();
  console.log("Backend server is running on https://localhost:8800");
});
