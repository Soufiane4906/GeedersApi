// controllers/travelStory.controller.js
import TravelStory from "../models/TravelStory.model.js";
import createError from "../utils/createError.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = "public/uploads/stories";
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, "story-" + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(createError(400, "Only image files are allowed!"), false);
        }
    },
});

export const createStory = async (req, res, next) => {
    upload.single("image")(req, res, async (err) => {
        if (err) return next(createError(400, err.message));

        try {
            const { name, email, title, location, ambassadorName, category, date, content, agreeTerms } = req.body;
            if (!name || !email || !title || !location || !ambassadorName || !category || !date || !content || agreeTerms !== "true") {
                return next(createError(400, "Please fill all required fields and agree to the terms."));
            }
            const storyData = { name, email, title, location, ambassadorName, category, date, content };
            if (req.file) storyData.imageUrl = `/uploads/stories/${req.file.filename}`;
            const story = await TravelStory.create(storyData);
            res.status(201).json(story);
        } catch (err) {
            next(err);
        }
    });
};

export const getStories = async (req, res, next) => {
    try {
        const filter = { status: "approved" };
        if (req.query.category && req.query.category !== "all") {
            filter.category = req.query.category;
        }
        const stories = await TravelStory.find(filter).sort({ createdAt: -1 });
        res.status(200).json(stories);
    } catch (err) {
        next(err);
    }
};

export const getStoryById = async (req, res, next) => {
    try {
        const story = await TravelStory.findById(req.params.id);
        if (!story || story.status !== "approved") return next(createError(404, "Story not found"));
        res.status(200).json(story);
    } catch (err) {
        next(err);
    }
};

export const updateStoryStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        if (!["pending", "approved", "rejected"].includes(status)) return next(createError(400, "Invalid status value"));
        const story = await TravelStory.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
        if (!story) return next(createError(404, "Story not found"));
        res.status(200).json(story);
    } catch (err) {
        next(err);
    }
};