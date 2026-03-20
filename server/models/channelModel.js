import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one user = one channel
    },

    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    category: {
      type: String,
      enum: ["Education", "Gaming", "Music", "Vlog", "Tech"],
      required: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    bannerImage: {
      type: String,
      default: "",
    },

    subscribers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    videos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],

    shorts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Short",
      },
    ],
    playlists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Playlist",
      },
    ],
    communityPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true },
);

const Channel = mongoose.model("Channel", channelSchema);

export default Channel;
