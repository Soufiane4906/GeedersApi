import { Country } from "../models/country.model.js";
import User from "../models/user.model.js";
import Gig from "../models/gig.model.js";

export const getCountries = async (req, res, next) => {
  try {
    const countries = await Country.find();
    res.status(200).json(countries);
  } catch (err) {
    next(err);
  }
};

export const getCountryById = async (req, res, next) => {
  try {
    const country = await Country.findById(req.params.id);
    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }
    res.status(200).json(country);
  } catch (err) {
    next(err);
  }
};

export const getCitiesByCountryId = async (req, res, next) => {
  try {
    const { countryId } = req.query;

    if (!countryId) {
      return res.status(400).json({ message: "Country ID is required" });
    }

    const country = await Country.findById(countryId);

    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }

    // Return the cities array from the country document
    res.status(200).json(country.cities || []);
  } catch (err) {
    next(err);
  }
};

export const createCountry = async (req, res, next) => {
  try {
    const newCountry = new Country(req.body);
    const savedCountry = await newCountry.save();
    res.status(201).json(savedCountry);
  } catch (err) {
    next(err);
  }
};

export const updateCountry = async (req, res, next) => {
  try {
    const updatedCountry = await Country.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
    );

    if (!updatedCountry) {
      return res.status(404).json({ message: "Country not found" });
    }

    res.status(200).json(updatedCountry);
  } catch (err) {
    next(err);
  }
};

export const deleteCountry = async (req, res, next) => {
  try {
    const result = await Country.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({ message: "Country not found" });
    }

    res.status(200).json({ message: "Country deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export const getGigsByCountry = async (req, res, next) => {
  try {
    const countryName = req.params.countryName;

    const gigs = await Gig.find({ country: countryName });

    res.status(200).json(gigs);
  } catch (err) {
    next(err);
  }
};

export const getUsersByCountry = async (req, res, next) => {
  try {
    const countryName = req.params.countryName;

    const users = await User.find({
      country: countryName,
      isAmbassador: true
    }).select("-password");

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const addCity = async (req, res, next) => {
  try {
    const { countryId } = req.params;
    const { name, description, image } = req.body;

    if (!name) {
      return res.status(400).json({ message: "City name is required" });
    }

    const country = await Country.findById(countryId);
    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }

    // Add the new city to the cities array
    country.cities.push({ name, description, image });
    await country.save();

    // Return the newly added city
    const newCity = country.cities[country.cities.length - 1];
    res.status(201).json(newCity);
  } catch (err) {
    next(err);
  }
};

export const addTouristPlace = async (req, res, next) => {
  try {
    const { countryId, cityId } = req.params;
    const { name, description } = req.body;

    const country = await Country.findById(countryId);
    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }

    const city = country.cities.id(cityId);
    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    city.touristPlaces.push({ name, description });
    await country.save();

    res.status(201).json(city.touristPlaces[city.touristPlaces.length - 1]);
  } catch (err) {
    next(err);
  }
};

export const updateTouristPlace = async (req, res, next) => {
  try {
    const { countryId, cityId, placeId } = req.params;
    const { name, description } = req.body;

    const country = await Country.findById(countryId);
    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }

    const city = country.cities.id(cityId);
    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    const place = city.touristPlaces.id(placeId);
    if (!place) {
      return res.status(404).json({ message: "Tourist place not found" });
    }

    if (name) place.name = name;
    if (description !== undefined) place.description = description;

    await country.save();
    res.status(200).json(place);
  } catch (err) {
    next(err);
  }
};

export const deleteTouristPlace = async (req, res, next) => {
  try {
    const { countryId, cityId, placeId } = req.params;

    const country = await Country.findById(countryId);
    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }

    const city = country.cities.id(cityId);
    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    const placeIndex = city.touristPlaces.findIndex(place =>
        place._id.toString() === placeId
    );

    if (placeIndex === -1) {
      return res.status(404).json({ message: "Tourist place not found" });
    }

    city.touristPlaces.splice(placeIndex, 1);
    await country.save();

    res.status(200).json({ message: "Tourist place deleted successfully" });
  } catch (err) {
    next(err);
  }
};