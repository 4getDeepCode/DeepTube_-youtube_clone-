import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
import { createVideo } from "../controllers/vieoController.js";

const contentRouter = express.Router();

contentRouter.post(
  "/upload-video",
  authMiddleware,
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  createVideo,
);

export default contentRouter;
