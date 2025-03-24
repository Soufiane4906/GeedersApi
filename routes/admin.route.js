import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import User from "../models/user.model.js";
import Gig from "../models/gig.model.js";
import Order from "../models/order.model.js";

const router = express.Router();

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || !user.isAdmin) {
      return res.status(403).send("Access denied: Admin rights required");
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error checking admin status");
  }
};




// Get dashboard stats
router.get("/dashboard-stats", verifyToken, isAdmin, async (req, res, next) => {
  try {
    // Count users
    const totalUsers = await User.countDocuments();
    const totalAmbassadors = await User.countDocuments({ isAmbassador: true });
    const totalGuests = await User.countDocuments({ isAmbassador: false, isAdmin: false });

    // Count gigs and orders
    const totalGigs = await Gig.countDocuments();
    const totalOrders = await Order.countDocuments();

    // Count pending verifications
    const pendingVerifications = await User.countDocuments({
      isAmbassador: true,
      isVerified: false,
      $or: [
        { imgRecto: { $exists: true, $ne: "" } },
        { imgVerso: { $exists: true, $ne: "" } },
        { imgPassport: { $exists: true, $ne: "" } }
      ]
    });

    // Calculate total revenue
    const orders = await Order.find({ isCompleted: true });
    const revenue = orders.reduce((acc, order) => acc + order.price, 0);

    res.status(200).send({
      totalUsers,
      totalAmbassadors,
      totalGuests,
      totalGigs,
      totalOrders,
      pendingVerifications,
      revenue
    });
  } catch (err) {
    next(err);
  }
});

// Get analytics data
router.get("/analytics", verifyToken, isAdmin, async (req, res, next) => {
  try {
    const { period = "month" } = req.query;

    // Calculate date range based on the period
    const now = new Date();
    let startDate = new Date();

    switch (period) {
      case "week":
        startDate.setDate(now.getDate() - 7);
        break;
      case "month":
        startDate.setMonth(now.getMonth() - 1);
        break;
      case "quarter":
        startDate.setMonth(now.getMonth() - 3);
        break;
      case "year":
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setMonth(now.getMonth() - 1); // Default to month
    }

    // User growth analytics
    const userGrowth = await getUserGrowthData(startDate);

    // Revenue analytics
    const revenueByMonth = await getRevenueData(startDate);

    // Orders by category
    const ordersByCategory = await getOrdersByCategoryData();

    // Top countries
    const topCountries = await getTopCountriesData();

    // Service performance
    const servicePerformance = await getServicePerformanceData();

    res.status(200).send({
      userGrowth,
      revenueByMonth,
      ordersByCategory,
      topCountries,
      servicePerformance
    });
  } catch (err) {
    next(err);
  }
});

// Helper functions to get analytics data
async function getUserGrowthData(startDate) {
  // Get user registrations by month, separated by user type
  const userAggregation = await User.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate }
      }
    },
    {
      $project: {
        month: { $month: "$createdAt" },
        year: { $year: "$createdAt" },
        isAmbassador: 1
      }
    },
    {
      $group: {
        _id: {
          month: "$month",
          year: "$year",
          isAmbassador: "$isAmbassador"
        },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 }
    }
  ]);

  // Format the aggregation results
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const growthByMonth = {};

  userAggregation.forEach(item => {
    const monthKey = `${item._id.year}-${item._id.month}`;
    if (!growthByMonth[monthKey]) {
      growthByMonth[monthKey] = {
        name: months[item._id.month - 1],
        guests: 0,
        ambassadors: 0
      };
    }

    if (item._id.isAmbassador) {
      growthByMonth[monthKey].ambassadors = item.count;
    } else {
      growthByMonth[monthKey].guests = item.count;
    }
  });

  return Object.values(growthByMonth);
}

async function getRevenueData(startDate) {
  // Get revenue by month
  const revenueAggregation = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate },
        isCompleted: true
      }
    },
    {
      $project: {
        month: { $month: "$createdAt" },
        year: { $year: "$createdAt" },
        price: 1
      }
    },
    {
      $group: {
        _id: {
          month: "$month",
          year: "$year"
        },
        revenue: { $sum: "$price" }
      }
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 }
    }
  ]);

  // Format the aggregation results
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return revenueAggregation.map(item => ({
    name: months[item._id.month - 1],
    revenue: item.revenue
  }));
}

async function getOrdersByCategoryData() {
  // This would require a category field in the Gig model
  // For now, let's assume we extract categories from POI or title
  const categories = ['City Tours', 'Adventure', 'Cultural', 'Nightlife', 'Food', 'Transportation'];
  const result = [];

  // In a real implementation, you would query your database
  // For this example, we'll return mock data
  for (let i = 0; i < categories.length; i++) {
    result.push({
      name: categories[i],
      value: Math.floor(Math.random() * 500) + 100 // Random count between 100-600
    });
  }

  return result;
}

async function getTopCountriesData() {
  // Get orders by country
  const countryAggregation = await Gig.aggregate([
    {
      $lookup: {
        from: "orders",
        localField: "_id",
        foreignField: "gigId",
        as: "orders"
      }
    },
    {
      $unwind: "$orders"
    },
    {
      $group: {
        _id: "$country",
        orders: { $sum: 1 }
      }
    },
    {
      $sort: { orders: -1 }
    },
    {
      $limit: 5
    }
  ]);

  return countryAggregation.map(item => ({
    name: item._id,
    orders: item.orders
  }));
}

async function getServicePerformanceData() {
  // This would typically be categorized by service type
  // For now, we'll use title or POI to determine the service type

  // Sample service types to analyze
  const serviceTypes = ['Car Tours', 'Walking Tours', 'Scooter Tours', 'Museum Guides', 'Food Tours'];
  const result = [];

  // In a real implementation, you would query your database with aggregation
  // For this example, we'll return mock data
  for (let i = 0; i < serviceTypes.length; i++) {
    const bookings = Math.floor(Math.random() * 300) + 100; // Random between 100-400
    result.push({
      name: serviceTypes[i],
      bookings: bookings,
      revenue: bookings * (Math.floor(Math.random() * 30) + 10) // Random price between 10-40
    });
  }

  return result;
}

export default router;