import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";

export const createGig = async (req, res, next) => {
  if (!req.userId) return next(createError(401, "You are not authenticated!"));

  const newGig = new Gig({
    userId: req.userId,
    ...req.body,
  });

  try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (err) {
    next(err);
  }
};

export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, "Gig not found!"));

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
    // Use populate to automatically fetch language details
    const gig = await Gig.findById(req.params.id).populate('languages');
    if (!gig) return next(createError(404, "Gig not found!"));

    res.status(200).send(gig);
  } catch (err) {
    next(err);
  }
};

export const getGigs = async (req, res, next) => {
  try {
    // Extract query parameters
    const { country, city, userId, sort, poi, languages, hasCar, hasScooter, startDate, endDate } = req.query;

    // Initial query filters
    const filters = {};

    // Log received query parameters for debugging
    console.log("Search query parameters:", {
      country,
      city,
      userId,
      sort,
      poi,
      languages,
      hasCar,
      hasScooter,
      startDate,
      endDate
    });

    // Add optional filters if they exist
    if (country) filters.country = country;
    if (city) filters.city = city;
    if (userId) filters.userId = userId;

    // Handle arrays that might come as comma-separated strings
    if (poi) {
      const poiArray = poi.split(',');
      filters.poi = { $in: poiArray };
    }

    if (languages) {
      const langArray = languages.split(',');
      filters.languages = { $in: langArray };
    }

    // Handle boolean filters
    if (hasCar === 'true') filters.hasCar = true;
    if (hasScooter === 'true') filters.hasScooter = true;

    // Handle date availability
    if (startDate && endDate) {
      // This is a simplified version - in reality, you'd need more complex logic
      // to check if the gig is available within the date range
    }

    // Log the constructed filter for debugging
    console.log("Constructed filters:", filters);

    // Set sorting criteria
    let sortOption = {};
    switch (sort) {
      case "sales":
        sortOption = { sales: -1 };
        break;
      case "popularity":
        sortOption = { totalStars: -1 };
        break;
      case "createdAt":
        sortOption = { createdAt: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    // Use populate to automatically fetch language details
    const gigs = await Gig.find(filters).populate('languages').sort(sortOption);

    // Log the number of results found
    console.log(`Found ${gigs.length} gigs matching the criteria`);

    res.status(200).send(gigs);
  } catch (err) {
    console.error("Error in getGigs:", err);
    next(err);
  }
};

export const updateGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, "Gig not found!"));

    if (gig.userId !== req.userId)
      return next(createError(403, "You can update only your gig!"));

    const updatedGig = await Gig.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
    ).populate('languages');

    res.status(200).send(updatedGig);
  } catch (err) {
    next(err);
  }
};

// Admin routes
export const getAdminGigs = async (req, res, next) => {
  try {
    const { page = 1, sort = 'createdAt', direction = 'desc', status, country, search } = req.query;
    const limit = 10; // Items per page
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};
    if (status === 'active') filter.active = true;
    if (status === 'inactive') filter.active = false;
    if (status === 'featured') filter.featured = true;
    if (country) filter.country = country;
    if (search) filter.title = { $regex: search, $options: 'i' };

    // Count total documents for pagination
    const totalDocs = await Gig.countDocuments(filter);
    const totalPages = Math.ceil(totalDocs / limit);

    // Sort options
    const sortOptions = {};
    sortOptions[sort] = direction === 'asc' ? 1 : -1;

    // Fetch gigs with pagination and sorting, and populate languages
    const gigs = await Gig.find(filter)
        .populate('languages')
        .sort(sortOptions)
        .skip(skip)
        .limit(limit);

    res.status(200).send({
      gigs,
      totalPages,
      currentPage: page,
      totalDocs
    });
  } catch (err) {
    next(err);
  }
};

export const getAdminGigStats = async (req, res, next) => {
  try {
    const stats = {
      total: await Gig.countDocuments(),
      active: await Gig.countDocuments({ active: true }),
      inactive: await Gig.countDocuments({ active: false }),
      featured: await Gig.countDocuments({ featured: true })
    };
    res.status(200).send(stats);
  } catch (err) {
    next(err);
  }
};

export const adminDeleteGig = async (req, res, next) => {
  try {
    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted by admin!");
  } catch (err) {
    next(err);
  }
};

export const adminUpdateGig = async (req, res, next) => {
  try {
    const updatedGig = await Gig.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
    ).populate('languages');

    res.status(200).send(updatedGig);
  } catch (err) {
    next(err);
  }
};

export const adminUpdateGigStatus = async (req, res, next) => {
  try {
    const updatedGig = await Gig.findByIdAndUpdate(
        req.params.id,
        { $set: { active: req.body.active } },
        { new: true }
    ).populate('languages');

    res.status(200).send(updatedGig);
  } catch (err) {
    next(err);
  }
};

export const adminUpdateGigFeatured = async (req, res, next) => {
  try {
    const updatedGig = await Gig.findByIdAndUpdate(
        req.params.id,
        { $set: { featured: req.body.featured } },
        { new: true }
    ).populate('languages');

    res.status(200).send(updatedGig);
  } catch (err) {
    next(err);
  }
};

export const adminBulkDeleteGigs = async (req, res, next) => {
  try {
    const { ids } = req.body;
    await Gig.deleteMany({ _id: { $in: ids } });
    res.status(200).send("Gigs have been deleted by admin!");
  } catch (err) {
    next(err);
  }
};

export const adminBulkUpdateGigStatus = async (req, res, next) => {
  try {
    const { ids, active } = req.body;
    await Gig.updateMany(
        { _id: { $in: ids } },
        { $set: { active } }
    );
    res.status(200).send("Gigs status has been updated by admin!");
  } catch (err) {
    next(err);
  }
};

export const adminBulkUpdateGigFeatured = async (req, res, next) => {
  try {
    const { ids, featured } = req.body;
    await Gig.updateMany(
        { _id: { $in: ids } },
        { $set: { featured } }
    );
    res.status(200).send("Gigs featured status has been updated by admin!");
  } catch (err) {
    next(err);
  }
};

export const getAllGigs = async (req, res, next) => {
  try {
    // Use populate to automatically fetch language details
    const gigs = await Gig.find().populate('languages');
    res.status(200).send(gigs);
  } catch (err) {
    next(err);
  }
};