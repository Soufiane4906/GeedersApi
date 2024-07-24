import express from "express";
import { getCountries, createCountry } from "../controllers/country.controller.js";

const router = express.Router();

router.get("/", getCountries);
router.post("/", createCountry);

export default router;
