import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
    },
    photoUrl: {
      type: String,
      default: "",
    },
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    },

    // 🔐 OTP reset system

    resetOtp: {
      type: String,
      default: null
    },
    otpExpires: {
      type: Date,
      default: null,
    },
    isOtpVerified: {
      type: Boolean,
      default: false,
    },

    // 📌 History Field

    history: [
      {
        contentId: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "history.contentType",
        },
        contentType: {
          type: String,
          enum: ["Video", "Short"],
          required: true,
        },
        watchedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
