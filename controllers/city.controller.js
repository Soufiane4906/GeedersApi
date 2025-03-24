import { City, Country } from "../models/country.model.js";

export const getCities = async (req, res, next) => {
  try {
    let cities;

    if (req.query.countryId) {
      // Get cities for a specific country
      const country = await Country.findById(req.query.countryId);
      if (!country) {
        return res.status(404).json({ message: "Country not found" });
      }
      cities = country.cities;
    } else {
      // Get all cities from all countries
      const countries = await Country.find();
      cities = countries.reduce((allCities, country) => {
        return [...allCities, ...country.cities.map(city => ({
          ...city.toObject(),
          countryName: country.name,
          countryId: country._id
        }))];
      }, []);
    }

    res.status(200).json(cities);
  } catch (err) {
    next(err);
  }
};

export const getCityById = async (req, res, next) => {
  try {
    const { countryId, cityId } = req.params;

    const country = await Country.findById(countryId);
    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }

    const city = country.cities.id(cityId);
    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    res.status(200).json(city);
  } catch (err) {
    next(err);
  }
};

export const createCity = async (req, res, next) => {
  try {
    const { countryId } = req.params;
    const { name, touristPlaces } = req.body;

    const country = await Country.findById(countryId);
    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }

    const newCity = { name, touristPlaces: touristPlaces || [] };
    country.cities.push(newCity);

    await country.save();

    res.status(201).json(country.cities[country.cities.length - 1]);
  } catch (err) {
    next(err);
  }
};

export const updateCity = async (req, res, next) => {
  try {
    const { countryId, cityId } = req.params;
    const { name, touristPlaces } = req.body;

    const country = await Country.findById(countryId);
    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }

    const city = country.cities.id(cityId);
    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    if (name) city.name = name;
    if (touristPlaces) city.touristPlaces = touristPlaces;

    await country.save();

    res.status(200).json(city);
  } catch (err) {
    next(err);
  }
};

export const deleteCity = async (req, res, next) => {
  try {
    const { countryId, cityId } = req.params;

    const country = await Country.findById(countryId);
    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }

    const cityIndex = country.cities.findIndex(city => city._id.toString() === cityId);
    if (cityIndex === -1) {
      return res.status(404).json({ message: "City not found" });
    }

    country.cities.splice(cityIndex, 1);
    await country.save();

    res.status(200).json({ message: "City deleted successfully" });
  } catch (err) {
    next(err);
  }
};