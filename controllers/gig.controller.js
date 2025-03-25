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

  // Basic filters
  if (q.userId) {
    filters.userId = q.userId;
  }

  if (q.country) {
    filters.country = q.country;
  }

  if (q.city) {
    filters.city = q.city;
  }

  // Set active filter to true by default
  filters.active = true;

  try {
    const gigs = await Gig.find(filters).sort({ [q.sort || "createdAt"]: -1 });
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

export const updateGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return next(createError(404, "Gig not found!"));
    }

    if (gig.userId !== req.userId) {
      return next(createError(403, "You can update only your gig!"));
    }

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

// ADMIN CONTROLLERS

// Récupérer tous les gigs pour l'admin (avec pagination, tri et filtres)
export const getAdminGigs = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = "createdAt",
      direction = "desc",
      status,
      country,
      search
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Construire le filtre
    const filter = {};

    if (status === "active") {
      filter.active = true;
    } else if (status === "inactive") {
      filter.active = false;
    } else if (status === "featured") {
      filter.featured = true;
    }

    if (country) {
      filter.country = country;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { desc: { $regex: search, $options: "i" } }
      ];
    }

    // Récupérer les gigs avec agrégation pour inclure les infos utilisateur
    const gigs = await Gig.aggregate([
      { $match: filter },
      { $sort: { [sort]: direction === "asc" ? 1 : -1 } },
      { $skip: skip },
      { $limit: parseInt(limit) },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userInfo"
        }
      },
      {
        $addFields: {
          username: { $arrayElemAt: ["$userInfo.username", 0] },
          userImg: { $arrayElemAt: ["$userInfo.img", 0] }
        }
      },
      {
        $project: {
          userInfo: 0
        }
      }
    ]);

    // Compter le nombre total de gigs correspondant au filtre
    const total = await Gig.countDocuments(filter);
    const totalPages = Math.ceil(total / parseInt(limit));

    res.status(200).json({
      gigs,
      total,
      totalPages,
      currentPage: parseInt(page)
    });
  } catch (err) {
    console.error("Error fetching admin gigs:", err);
    next(err);
  }
};

// Obtenir les statistiques des gigs
export const getAdminGigStats = async (req, res, next) => {
  try {
    const total = await Gig.countDocuments();
    const active = await Gig.countDocuments({ active: true });
    const inactive = await Gig.countDocuments({ active: false });
    const featured = await Gig.countDocuments({ featured: true });

    res.status(200).json({
      total,
      active,
      inactive,
      featured
    });
  } catch (err) {
    console.error("Error fetching gig stats:", err);
    next(err);
  }
};

// Supprimer un gig (admin)
export const adminDeleteGig = async (req, res, next) => {
  try {
    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted!");
  } catch (err) {
    console.error("Error deleting gig:", err);
    next(err);
  }
};

// Mettre à jour le statut d'un gig
export const adminUpdateGigStatus = async (req, res, next) => {
  try {
    const { active } = req.body;

    const updatedGig = await Gig.findByIdAndUpdate(
        req.params.id,
        { active },
        { new: true }
    );

    if (!updatedGig) {
      return next(createError(404, "Gig not found!"));
    }

    res.status(200).json(updatedGig);
  } catch (err) {
    console.error("Error updating gig status:", err);
    next(err);
  }
};

// Mettre à jour le statut "en vedette" d'un gig
export const adminUpdateGigFeatured = async (req, res, next) => {
  try {
    const { featured } = req.body;

    const updatedGig = await Gig.findByIdAndUpdate(
        req.params.id,
        { featured },
        { new: true }
    );

    if (!updatedGig) {
      return next(createError(404, "Gig not found!"));
    }

    res.status(200).json(updatedGig);
  } catch (err) {
    console.error("Error updating gig featured status:", err);
    next(err);
  }
};

// Supprimer plusieurs gigs
export const adminBulkDeleteGigs = async (req, res, next) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return next(createError(400, "Invalid or empty IDs array"));
    }

    await Gig.deleteMany({ _id: { $in: ids } });

    res.status(200).send(`${ids.length} gigs have been deleted!`);
  } catch (err) {
    console.error("Error bulk deleting gigs:", err);
    next(err);
  }
};

// Mettre à jour le statut de plusieurs gigs
export const adminBulkUpdateGigStatus = async (req, res, next) => {
  try {
    const { ids, active } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return next(createError(400, "Invalid or empty IDs array"));
    }

    if (typeof active !== 'boolean') {
      return next(createError(400, "Active status must be a boolean"));
    }

    const result = await Gig.updateMany(
        { _id: { $in: ids } },
        { $set: { active } }
    );

    res.status(200).json({
      message: `${result.modifiedCount} gigs have been updated!`,
      modifiedCount: result.modifiedCount
    });
  } catch (err) {
    console.error("Error bulk updating gig status:", err);
    next(err);
  }
};

// Mettre à jour le statut "en vedette" de plusieurs gigs
export const adminBulkUpdateGigFeatured = async (req, res, next) => {
  try {
    const { ids, featured } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return next(createError(400, "Invalid or empty IDs array"));
    }

    if (typeof featured !== 'boolean') {
      return next(createError(400, "Featured status must be a boolean"));
    }

    const result = await Gig.updateMany(
        { _id: { $in: ids } },
        { $set: { featured } }
    );

    res.status(200).json({
      message: `${result.modifiedCount} gigs have been updated!`,
      modifiedCount: result.modifiedCount
    });
  } catch (err) {
    console.error("Error bulk updating gig featured status:", err);
    next(err);
  }
};
