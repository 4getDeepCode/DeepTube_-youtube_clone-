import {
  addToHistoryService,
  createChannelService,
  getAllChannelService,
  getChannelService,
  getCurrentUserService,
  getHistoryService,
  getRecommendedContentService,
  getSubscribedContentService,
  toggleSubscribeService,
  updateChannelService,
} from "../services/userService.js";

// Get Current User
export const getCurrentUser = async (req, res) => {
  try {
    const user = await getCurrentUserService(req.userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Create Channel
export const createChannel = async (req, res) => {
  try {
    const channel = await createChannelService(req.body, req.files, req.userId);
    res.status(201).json(channel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update Channel
export const updateChannel = async (req, res) => {
  try {
    const channel = await updateChannelService(req.body, req.files, req.userId);
    res.status(200).json(channel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get Channel
export const getChannel = async (req, res) => {
  try {
    const channel = await getChannelService(req.userId);
    res.status(200).json(channel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get All Channels
export const getAllChannel = async (req, res) => {
  try {
    const channels = await getAllChannelService();
    res.status(200).json(channels);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Toggle Subscribe
export const toggleSubscribe = async (req, res) => {
  try {
    const channel = await toggleSubscribeService(
      req.body.channelId,
      req.userId,
    );
    res.status(200).json(channel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Subscribed Content
export const getSubscribedContent = async (req, res) => {
  try {
    const data = await getSubscribedContentService(req.userId);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Add to History
export const addToHistory = async (req, res) => {
  try {
    await addToHistoryService(
      req.userId,
      req.body.contentId,
      req.body.contentType,
    );
    res.status(200).json({ message: "Added to history" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get History
export const getHistory = async (req, res) => {
  try {
    const history = await getHistoryService(req.userId);
    res.status(200).json(history);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Recommendations
export const getRecommendedContent = async (req, res) => {
  try {
    const data = await getRecommendedContentService(req.userId);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
