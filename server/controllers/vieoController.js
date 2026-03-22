import { createVideoService } from "../services/videoService.js";

// CREATE
export const createVideo = async (req, res) => {
  try {
    const video = await createVideoService(req.body, req.files);
    res.status(201).json({ message: "Video uploaded", video });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
