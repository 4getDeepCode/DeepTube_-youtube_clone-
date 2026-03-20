import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  addToHistory,
  createChannel,
  getAllChannel,
  getChannel,
  getCurrentUser,
  getHistory,
  getRecommendedContent,
  getSubscribedContent,
  toggleSubscribe,
  updateChannel,
} from "../controllers/userController.js";
import upload from "../middlewares/multer.js";


const userRouter = express.Router();

// User
userRouter.get("/me", authMiddleware, getCurrentUser);

// Channel
userRouter.post(
  "/channel",
  authMiddleware,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "bannerImage", maxCount: 1 },
  ]),
  createChannel,
);

userRouter.put(
  "/channel",
  authMiddleware,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "bannerImage", maxCount: 1 },
  ]),
  updateChannel,
);

userRouter.get("/channel", authMiddleware, getChannel);
userRouter.get("/channels", getAllChannel);

// Subscribe
userRouter.post("/channel/subscribe", authMiddleware, toggleSubscribe);

// Subscribed content
userRouter.get("/subscriptions", authMiddleware, getSubscribedContent);

// History
userRouter.post("/history", authMiddleware, addToHistory);
userRouter.get("/history", authMiddleware, getHistory);

// Recommendations
userRouter.get("/recommendations", authMiddleware, getRecommendedContent);

export default userRouter;
