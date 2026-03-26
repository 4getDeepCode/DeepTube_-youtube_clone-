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