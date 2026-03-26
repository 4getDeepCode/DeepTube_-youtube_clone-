import {
  createShortService,
  deleteShortService,
  fetchShortService,
  getAllShortsService,
  updateShortService,
} from "../services/shortService.js";

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

// GET ONE
export const fetchShort = async (req, res) => {
  try {
    const short = await fetchShortService(req.params.shortId);
    res.status(200).json(short);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// UPDATE
export const updateShort = async (req, res) => {
  try {
    const short = await updateShortService(req.params.shortId, req.body);
    res.status(200).json(short);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
export const deleteShort = async (req, res) => {
  try {
    await deleteShortService(req.params.shortId);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
