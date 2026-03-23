import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
import {
  createVideo,
  getAllVideos,
  getChannelVideos,
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
contentRouter.get("/channel/:channelId", getChannelVideos);

// GET ALL VIDEOS
contentRouter.get("/all-videos", getAllVideos)

export default contentRouter;
