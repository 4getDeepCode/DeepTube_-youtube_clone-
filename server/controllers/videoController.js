import {
  createVideoService,
  getAllVideosService,
  getChannelVideosService,
} from "../services/videoService.js";

// CREATE
export const createVideo = async (req, res) => {
  try {
    const video = await createVideoService(req.body, req.files);
    res.status(201).json({ message: "Video uploaded", video });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET CHANNEL VIDEOS
export const getChannelVideos = async (req, res) => {
  try {
    const { channelId } = req.params;

    const videos = await getChannelVideosService(channelId);

    res.status(200).json({
      success: true,
      videos,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL
export const getAllVideos = async (req, res) => {
  try {
    const videos = await getAllVideosService();
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
