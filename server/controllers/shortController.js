import { createShortService, getAllShortsService } from "../services/shortService.js";

// CREATE
export const createShort = async (req, res) => {
  try {
    const short = await createShortService(req.body, req.file);
    res.status(201).json({ message: "Short created", short });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET ALL
export const getAllShorts = async (req, res) => {
  try {
    const shorts = await getAllShortsService();
    res.status(200).json(shorts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};