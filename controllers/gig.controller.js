import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";
import User from '../models/user.model.js';

export const createGig = async (req, res, next) => {
  const newGig = new Gig({
    userId: req.userId,
    ...req.body,
  });

  try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (err) {
    console.error('Error saving gig:', err);
    next(err);
  }
};

export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (gig.userId !== req.userId)
      return next(createError(403, "You can delete only your gig!"));

    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted!");
  } catch (err) {
    next(err);
  }
};

export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) next(createError(404, "Gig not found!"));
    res.status(200).send(gig);
  } catch (err) {
    next(err);
  }
};

export const getGigs = async (req, res, next) => {
  const q = req.query;

  // Define the filters based on query parameters
  const filters = {};
  if (q.userId) {
    filters.userId = q.userId;
  }

  if (q.country) {
    filters.country = q.country;
  }

  if (q.city) {
    filters.city = q.city;
  }

  // Handle POI filtering
  if (q.poi) {
    const poiList = q.poi.split(',').map(poi => poi.trim());
    filters.poi = { $in: poiList };
  }

  // Handle language filtering
  if (q.languages) {
    const languages = q.languages.split(',').map(lang => lang.trim());
    try {
      const users = await User.find({ languages: { $in: languages } });
      const userIds = users.map(user => user._id.toString());
      filters.userId = { $in: userIds };
    } catch (err) {
      return next(err);
    }
  }

  // Handle date range filtering
  if (q.startDate && q.endDate) {
    // Implement date filtering based on your availability model
    // This is a placeholder - adjust based on how you store availability
    const startDate = new Date(q.startDate);
    const endDate = new Date(q.endDate);

    // Example implementation - adjust based on your data model
    filters.availabilityStart = { $lte: endDate };
    filters.availabilityEnd = { $gte: startDate };
  }

  // Handle sorting
  let sortOption = {};
  if (q.sort === 'sales') {
    sortOption = { sales: -1 };
  } else if (q.sort === 'popularity') {
    sortOption = { totalStars: -1 };
  } else if (q.sort === 'createdAt') {
    sortOption = { createdAt: -1 };
  }

  try {
    const gigs = await Gig.find(filters).sort(sortOption);
    res.status(200).send(gigs);
  } catch (err) {
    next(err);
  }
};

export const getAllGigs = async (req, res, next) => {
  try {
    const gigs = await Gig.find();
    res.status(200).send(gigs);
  } catch (err) {
    next(err);
  }
};

// New endpoint to get all countries
export const getCountries = async (req, res, next) => {
  try {
    const countries = await Gig.distinct("country");
    res.status(200).send(countries);
  } catch (err) {
    next(err);
  }
};

// New endpoint to get cities for a specific country
export const getCities = async (req, res, next) => {
  try {
    const { country } = req.query;
    if (!country) {
      return next(createError(400, "Country parameter is required"));
    }

    const cities = await Gig.distinct("city", { country });
    res.status(200).send(cities);
  } catch (err) {
    next(err);
  }
};