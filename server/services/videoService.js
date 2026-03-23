import Channel from "../models/channelModel.js";
import uploadOnCloudinary from "../config/cloudinary.js";
import Video from "../models/videoModel.js";

// CREATE VIDEO

export const createVideoService = async (body, files) => {
  const { title, description, tags, channel } = body;

  if (!title || !files?.video || !files?.thumbnail || !channel) {
    throw new Error("Video, thumbnail, title, and channel ID are required");
  }

  const channelData = await Channel.findById(channel);
  if (!channelData) throw new Error("Channel not found");

  const uploadedVideo = await uploadOnCloudinary(files.video[0].path);
  const uploadedThumbnail = await uploadOnCloudinary(files.thumbnail[0].path);

  let parsedTags = [];
  if (tags) {
    try {
      parsedTags = JSON.parse(tags);
    } catch {
      parsedTags = [];
    }
  }

  const newVideo = await Video.create({
    channel: channelData._id,
    title,
    description: description || "",
    videoUrl: uploadedVideo,
    thumbnail: uploadedThumbnail,
    tags: parsedTags,
  });

  await Channel.findByIdAndUpdate(channelData._id, {
    $push: { videos: newVideo._id },
  });

  return newVideo;
};

// GET CHANNEL VIDEOS
export const getChannelVideosService = async (channelId) => {
  if (!channelId) throw new Error("Channel ID is required");

  const videos = await Video.find({ channel: channelId })
    .select("title thumbnail createdAt")
    .sort({ createdAt: -1 });

  return videos;
};

// GET ALL VIDEOS
export const getAllVideosService = async () => {
  return await Video.find()
    .populate("channel comments.author comments.replies.author")
    .sort({ createdAt: -1 });
};
