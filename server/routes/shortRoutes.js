import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
import { createShort } from "../controllers/shortController.js";

const shortRouter = express.Router();

// upload short video
shortRouter.post("/upload-short", authMiddleware, upload.single("video"), createShort);


export default shortRouter;