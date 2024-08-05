import { Country } from "../models/country.model.js";

export const getCountries = async (req, res, next) => {
  try {
    const countries = await Country.find();
    res.status(200).json(countries);
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
