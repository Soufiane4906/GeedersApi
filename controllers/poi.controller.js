import POI from "../models/poi.model.js";
import createError from "../utils/createError.js";

export const addPOI = async (req, res, next) => {
  try {
    const newPOI = new POI({
      name: req.body.name,
      image: req.body.image
    });

    const savedPOI = await newPOI.save();
    res.status(201).json(savedPOI);
  } catch (err) {
    next(err);
  }
};

export const getPOIs = async (req, res, next) => {
  try {
    const pois = await POI.find();
    res.status(200).json({ pois, total: pois.length });
  } catch (err) {
    next(err);
  }
};

export const updatePOI = async (req, res, next) => {
  try {
    const updatedPOI = await POI.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          image: req.body.image
        },
        { new: true }
    );

    if (!updatedPOI) {
      return next(createError(404, "POI not found"));
    }

    res.status(200).json(updatedPOI);
  } catch (err) {
    next(err);
  }
};

export const deletePOI = async (req, res, next) => {
  try {
    const deletedPOI = await POI.findByIdAndDelete(req.params.id);

    if (!deletedPOI) {
      return next(createError(404, "POI not found"));
    }

    res.status(200).json({ message: "POI deleted successfully" });
  } catch (err) {
    next(err);
  }
};
