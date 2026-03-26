import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
import {
  createShort,
  deleteShort,
  fetchShort,
  getAllShorts,
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

export default shortRouter;
