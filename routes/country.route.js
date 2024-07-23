import express from "express";
import { getCountries, createCountry } from "../controllers/country.controller.js";

const router = express.Router();

router.get("/countries", getCountries);
router.post("/countries", createCountry);

export default router;
