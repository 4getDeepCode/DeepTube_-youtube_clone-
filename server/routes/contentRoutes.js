import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
import {
  addComment,
  addReply,
  addView,
  createVideo,
  deleteVideo,
  fetchVideo,
  getAllVideos,
  getChannelVideos,
  getLikedVideos,
  getSavedVideos,
  toggleDislikeVideo,
  toggleLikeVideo,
  toggleSaveVideo,
  updateVideo,
} from "../controllers/videoController.js";

const contentRouter = express.Router();

// UPLOAD VIDEO

contentRouter.post(
  "/upload-video",
  authMiddleware,
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  createVideo,
);

// GET CHANNEL VIDEOS
contentRouter.get("/channel/:channelId", authMiddleware, getChannelVideos);

// GET ALL VIDEOS
contentRouter.get("/all-videos", getAllVideos);

// GET SINGLE VIDEO
contentRouter.get("/fetch-video/:videoId", authMiddleware, fetchVideo);

// UPDATE VIDEO
contentRouter.put(
  "/update-video/:videoId",
  authMiddleware,
  upload.single("thumbnail"),
  updateVideo,
);

// DELETE VIDEO
contentRouter.delete("/delete-video/:videoId", authMiddleware, deleteVideo);

// Like video
contentRouter.put(
  "/video/:videoId/toggle-like",
  authMiddleware,
  toggleLikeVideo,
);

// Dislike video
contentRouter.put(
  "/video/:videoId/toggle-dislike",
  authMiddleware,
  toggleDislikeVideo,
);

// Add comment
contentRouter.post("/video/:videoId/comment", authMiddleware, addComment);

// Add reply to comment
contentRouter.post("/video/:videoId/:commentId/reply", authMiddleware, addReply);

// Add view
contentRouter.put("/video/:videoId/add-view", addView);

// Save / Unsave video
contentRouter.put("/video/:videolikedvideosId/toggle-save", authMiddleware, toggleSaveVideo);

// TO GET SAVED VIDEO
contentRouter.get("/savevideos",authMiddleware, getSavedVideos);

// TO GET LIKED VIDEO
contentRouter.get("/likedvideos",authMiddleware, getLikedVideos)

export default contentRouter;
