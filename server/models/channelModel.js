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

    handle: {
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

    // Scalable approach
    subscribersCount: {
      type: Number,
      default: 0,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Channel = mongoose.model("Channel", channelSchema);

export default Channel;