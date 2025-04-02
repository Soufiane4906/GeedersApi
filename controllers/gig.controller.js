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
    const gig = await Gig.findById(req.params.id);
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

    // Initial query filters - only active gigs
    const filters = { active: null };

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
      // Use $in to match gigs containing ANY of the specified POIs
      filters.poi = { $in: poiArray };
    }

    if (languages) {
      const langArray = languages.split(',');
      // Use $in to match gigs that support ANY of the specified languages
      filters.languages = { $in: langArray };
    }

    // Handle boolean filters
    if (hasCar === 'true') filters.hasCar = true;
    if (hasScooter === 'true') filters.hasScooter = true;

    // Handle date availability
    if (startDate && endDate) {
      // This is a simplified version - in reality, you'd need more complex logic
      // to check if the gig is available within the date range
      // This depends on how your availabilityTimes field is structured
      // For now, we'll skip this part as it needs more specific implementation
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

    const gigs = await Gig.find(filters).sort(sortOption);

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
    );

    res.status(200).send(updatedGig);
  } catch (err) {
    next(err);
  }
};

// Admin routes
export const getAdminGigs = async (req, res, next) => {
  try {
    const gigs = await Gig.find();
    res.status(200).send(gigs);
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
    );
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
    );
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
    );
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
    const gigs = await Gig.find();
    res.status(200).send(gigs);
  } catch (err) {
    next(err);
  }
};