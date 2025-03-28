import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";
import User from '../models/user.model.js'; // Adjust the path as needed

export const createGig = async (req, res, next) => {
  // Uncomment if you want to check user roles
  // if (req.isSeller)
  //   return next(createError(403, "Only sellers can create a gig!"));



  const newGig = new Gig({
    userId: req.userId,
    ...req.body,
  });

  try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (err) {
    console.error('Error saving gig:', err); // Log the error
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

  if (q.languages) {
    const languages = q.languages.split(',').map(lang => lang.trim());
    try {
      const users = await User.find({ languages: { $in: languages } });
      const userIds = users.map(user => user._id);
      filters.userId = { $in: userIds };
    } catch (err) {
      return next(err);
    }

  }

  // Handle sorting
  let sortOption = {};
  if (q.sort === 'sales') {
    sortOption = { sales: -1 }; // Example for best-selling
  } else if (q.sort === 'popularity') {
    sortOption = { stars: -1 }; // Example for popularity
  } else if (q.sort === 'createdAt') {
    sortOption = { createdAt: -1 }; // Newest
  }

  try {
    const gigs = await Gig.find(filters).sort(sortOption);
    res.status(200).send(gigs);
  } catch (err) {
    next(err);
  }
};
