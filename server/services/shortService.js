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

// LIKE SHORT
export const toggleLikeShortService = async (shortId, userId) => {
  const short = await Short.findById(shortId);
  if (!short) throw new Error("Short not found");

  if (short.likes.includes(userId)) {
    short.likes.pull(userId);
  } else {
    short.likes.push(userId);
    short.dislikes.pull(userId);
  }

  await short.save();
  return short;
};

// DISLIKE
export const toggleDislikeShortService = async (shortId, userId) => {
  const short = await Short.findById(shortId);
  if (!short) throw new Error("Short not found");

  if (short.dislikes.includes(userId)) {
    short.dislikes.pull(userId);
  } else {
    short.dislikes.push(userId);
    short.likes.pull(userId);
  }

  await short.save();
  return short;
};

// COMMENT
export const addCommentShortService = async (shortId, userId, message) => {
  const short = await Short.findById(shortId);
  if (!short) throw new Error("Short not found");

  short.comments.unshift({ author: userId, message });
  await short.save();

  return await Short.findById(shortId)
    .populate("comments.author", "username photoUrl")
    .populate("comments.replies.author", "username photoUrl")
    .populate("channel");
};

// REPLY
export const addReplyShortService = async (shortId, commentId, userId, message) => {
  const short = await Short.findById(shortId);
  if (!short) throw new Error("Short not found");

  const comment = short.comments.id(commentId);
  if (!comment) throw new Error("Comment not found");

  comment.replies.unshift({ author: userId, message });
  await short.save();

  return await Short.findById(shortId)
    .populate("comments.author", "username photoUrl")
    .populate("comments.replies.author", "username photoUrl")
    .populate("channel");
};