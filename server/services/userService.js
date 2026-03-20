import uploadOnCloudinary from "../config/cloudinary.js"
import Channel from "../models/channelModel.js";
import Short from "../models/shortModel.js";
import User from "../models/userModel.js";
import Video from "../models/videoModel.js";

// Get Current User
export const getCurrentUserService = async (userId) => {
  const user = await User.findById(userId)
    .select("-password")
    .populate("channel");

  if (!user) throw new Error("User not found");

  return user;
};

// Create Channel
export const createChannelService = async (data, files, userId) => {
  const { name, description, category } = data;

  const existingChannel = await Channel.findOne({ owner: userId });
  if (existingChannel) throw new Error("User already has a channel");

  const nameExists = await Channel.findOne({ name });
  if (nameExists) throw new Error("Channel name already taken");

  let avatar, bannerImage;

  if (files?.avatar) {
    avatar = await uploadOnCloudinary(files.avatar[0].path);
  }
  if (files?.bannerImage) {
    bannerImage = await uploadOnCloudinary(files.bannerImage[0].path);
  }

  const newChannel = await Channel.create({
    name,
    description,
    avatar,
    bannerImage,
    owner: userId,
    category,
  });

  await User.findByIdAndUpdate(userId, {
    channel: newChannel._id,
    username: name,
    photoUrl: avatar,
  });

  return newChannel;
};

// Update Channel
export const updateChannelService = async (data, files, userId) => {
  const { name, description, category } = data;

  const channel = await Channel.findOne({ owner: userId });
  if (!channel) throw new Error("Channel not found");

  if (name && name !== channel.name) {
    const nameExists = await Channel.findOne({ name });
    if (nameExists) throw new Error("Channel name already taken");
    channel.name = name;
  }

  if (description !== undefined) channel.description = description;
  if (category !== undefined) channel.category = category;

  if (files?.avatar) {
    channel.avatar = await uploadOnCloudinary(files.avatar[0].path);
  }
  if (files?.bannerImage) {
    channel.bannerImage = await uploadOnCloudinary(files.bannerImage[0].path);
  }

  await channel.save();

  await User.findByIdAndUpdate(userId, {
    username: name || undefined,
    photoUrl: channel.avatar || undefined,
  });

  return channel;
};

// Get Channel
export const getChannelService = async (userId) => {
  const channel = await Channel.findOne({ owner: userId })
    .populate("owner");

  if (!channel) throw new Error("Channel not found");

  return channel;
};

// Get All Channels
export const getAllChannelService = async () => {
  return await Channel.find().populate("owner");
};

// Toggle Subscribe
export const toggleSubscribeService = async (channelId, userId) => {
  const channel = await Channel.findById(channelId);
  if (!channel) throw new Error("Channel not found");

  const isSubscribed = channel.subscribers.includes(userId);

  if (isSubscribed) {
    channel.subscribers.pull(userId);
  } else {
    channel.subscribers.push(userId);
  }

  await channel.save();

  return channel;
};

// Get Subscribed Content
export const getSubscribedContentService = async (userId) => {
  const channels = await Channel.find({ subscribers: userId })
    .populate("videos")
    .populate("shorts");

  return channels;
};

// Add to History
export const addToHistoryService = async (userId, contentId, contentType) => {
  if (!["Video", "Short"].includes(contentType)) {
    throw new Error("Invalid contentType");
  }

  const model = contentType === "Video" ? Video : Short;

  const content = await model.findById(contentId);
  if (!content) throw new Error(`${contentType} not found`);

  await User.findByIdAndUpdate(userId, {
    $pull: { history: { contentId, contentType } },
  });

  await User.findByIdAndUpdate(userId, {
    $push: {
      history: { contentId, contentType, watchedAt: new Date() },
    },
  });

  return true;
};

// Get History
export const getHistoryService = async (userId) => {
  const user = await User.findById(userId)
    .populate("history.contentId")
    .select("history");

  if (!user) throw new Error("User not found");

  return user.history.sort(
    (a, b) => new Date(b.watchedAt) - new Date(a.watchedAt)
  );
};

// Recommendation (basic)
export const getRecommendedContentService = async (userId) => {
  const videos = await Video.find().populate("channel").limit(10);
  const shorts = await Short.find().populate("channel").limit(10);

  return { videos, shorts };
};