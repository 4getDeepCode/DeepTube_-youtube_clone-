import { createShortService } from "../services/shortService.js";

// CREATE
export const createShort = async (req, res) => {
  try {
    const short = await createShortService(req.body, req.file);
    res.status(201).json({ message: "Short created", short });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};