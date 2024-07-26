import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";

export const createGig = async (req, res, next) => {
  // Uncomment if you want to check user roles
  // if (req.isSeller)
  //   return next(createError(403, "Only sellers can create a gig!"));

  console.log('Request Body:', req.body); // Log the request body
  console.log('User ID:', req.userId); // Log the user ID

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
  console.log(q);

  // Define the filters based on query parameters
  const filters = {};

  if (q.country) {
    filters.country = q.country;
    //console both
    console.log(q.country);
    console.log(filters.country);
  }

  if (q.city) {
    filters.city = q.city;
    //console both
    console.log(q.city);
    console.log(filters.city);
  }

  if (q.languages) {
    filters.languages = q.languages;
    //console both
    console.log(q.languages);
    console.log(filters.languages);
  }

  // if (q.vehicles) {
  //   // Handle vehicle filtering based on the query parameter
  //   const vehicles = q.vehicles.split(',').map(v => v.trim());
  //   filters.$or = [
  //     { hasCar: vehicles.includes('car') },
  //     { hasScooter: vehicles.includes('scooter') },
  //   ];
  // }

  if (q.sort) {
    // Ensure sorting is applied if specified
    const sortBy = q.sort;
    filters.sort = { [sortBy]: -1 };
  }

  try {
    // Fetch the gigs based on the filters
    const gigs = await Gig.find(filters).sort(filters.sort || {});
    //console both
    console.log("---------------giigs---------------------------");
    console.log(gigs);
    console.log("-----------------fi-------------------------");

    console.log(filters);
    console.log("------------------------------------------");

    res.status(200).send(gigs);
  } catch (err) {
    next(err);
  }
};
