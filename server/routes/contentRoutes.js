import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
import {
  createVideo,
  fetchVideo,
  getAllVideos,
  getChannelVideos,
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
contentRouter.put("/update-video/:videoId",authMiddleware,upload.single("thumbnail"),updateVideo);


export default contentRouter;
