import uploadOnCloudinary from "../config/cloudinary.js";
import Channel from "../models/channelModel.js";
import Short from "../models/shortModel.js";

// CREATE SHORT
export const createShortService = async (body, file) => {
  const { title, description, tags, channelId } = body;

  if (!file) throw new Error("Short video is required");

  const videoUpload = await uploadOnCloudinary(file.path);

  const newShort = await Short.create({
    title,
    description,
    tags: tags ? JSON.parse(tags) : [],
    channel: channelId,
    shortUrl: videoUpload,
  });

  await Channel.findByIdAndUpdate(channelId, {
    $push: { shorts: newShort._id },
  });

  return newShort;
};

// GET ALL SHORTS
export const getAllShortsService = async () => {
  return await Short.find()
    .populate("channel comments.author comments.replies.author")
    .sort({ createdAt: -1 });
};

// GET SINGLE SHORT
export const fetchShortService = async (shortId) => {
  const short = await Short.findById(shortId)
    .populate("channel", "name avatar")
    .populate("likes", "username photoUrl");

  if (!short) throw new Error("Short not found");

  return short;
};

// UPDATE SHORT
export const updateShortService = async (shortId, body) => {
  const short = await Short.findById(shortId);
  if (!short) throw new Error("Short not found");

  const { title, description, tags } = body || {};

  if (title) short.title = title;
  if (description) short.description = description;

  if (tags) {
    try {
      short.tags = JSON.parse(tags);
    } catch {
      short.tags = [];
    }
  }

  await short.save();
  return short;
};

// DELETE SHORT
export const deleteShortService = async (shortId) => {
  const short = await Short.findById(shortId);
  if (!short) throw new Error("Short not found");

  await Channel.findByIdAndUpdate(short.channel, {
    $pull: { shorts: short._id },
  });

  await Short.findByIdAndDelete(shortId);
};
