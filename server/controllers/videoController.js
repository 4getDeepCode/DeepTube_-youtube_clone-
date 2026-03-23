import {
  createVideoService,
  deleteVideoService,
  fetchVideoService,
  getAllVideosService,
  getChannelVideosService,
  updateVideoService,
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

// GET ONE
export const fetchVideo = async (req, res) => {
  try {
    const video = await fetchVideoService(req.params.videoId);
    res.status(200).json(video);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// UPDATE VIDEO
export const updateVideo = async (req, res) => {
  try {
    const video = await updateVideoService(
      req.params.videoId,
      req.body,
      req.file,
    );
    res.status(200).json(video);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE VIDEO
export const deleteVideo = async (req, res) => {
  try {
    await deleteVideoService(req.params.videoId);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
