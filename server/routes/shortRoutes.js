import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
import {
  addCommentforShort,
  addReplyforShort,
  addViewforShort,
  createShort,
  deleteShort,
  fetchShort,
  getAllShorts,
  toggleDislikeShort,
  toggleLikeShort,
  toggleSaveShort,
  updateShort,
} from "../controllers/shortController.js";

const shortRouter = express.Router();

// upload short video
shortRouter.post(
  "/upload-short",
  authMiddleware,
  upload.single("video"),
  createShort,
);

// get all short video
shortRouter.get("/allshorts", getAllShorts);

// get single short video
shortRouter.get("/fetch-short/:shortId", fetchShort);

// update short video
shortRouter.put(
  "/update-short/:shortId",
  authMiddleware,
  upload.none(),
  updateShort,
);

// delete short video
shortRouter.delete("/delete-short/:shortId", authMiddleware, deleteShort);

// like short video
shortRouter.put("/like/:shortId/toggle-like", authMiddleware, toggleLikeShort);

//  dislike short video
shortRouter.put(
  "/dislike/:shortId/toggle-dislike",
  authMiddleware,
  toggleDislikeShort,
);

//  Add comment short video
shortRouter.post("/comment/:shortId", authMiddleware, addCommentforShort);

// Add reply to comment short
shortRouter.post(
  "/comment/:shortId/:commentId/reply",
  authMiddleware,
  addReplyforShort,
);

//  Add view
shortRouter.put("/add-view/:shortId", authMiddleware, addViewforShort);

// Save / Unsave short
shortRouter.put(
  "/save-short/:shortId/toggle-save",
  authMiddleware,
  toggleSaveShort,
);

export default shortRouter;
