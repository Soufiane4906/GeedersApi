import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Language } from "../models/language.model.js";

export const createLanguage = async (req, res) => {
    try {
        const { langue, flag } = req.body;
        const newLanguage = new Language({ langue, flag });
        await newLanguage.save();
        res.status(201).json(newLanguage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getLanguages = async (req, res) => {
    try {
        const languages = await Language.find();
        res.status(200).json(languages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateLanguage = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedLanguage = await Language.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedLanguage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteLanguage = async (req, res) => {
    try {
        const { id } = req.params;
        await Language.findByIdAndDelete(id);
        res.status(200).json({ message: "Langue supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
