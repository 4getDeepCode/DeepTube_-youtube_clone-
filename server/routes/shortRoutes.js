import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
import { createShort, getAllShorts } from "../controllers/shortController.js";

const shortRouter = express.Router();

// upload short video
shortRouter.post("/upload-short", authMiddleware, upload.single("video"), createShort);

// get all short video
shortRouter.get("/allshorts", getAllShorts);


export default shortRouter;