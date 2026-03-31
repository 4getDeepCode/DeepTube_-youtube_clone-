import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
import {
  addCommentInPost,
  addReplyInPost,
  createPost,
  deletePost,
  getAllPosts,
  toggleLikePost,
} from "../controllers/postController.js";

const postRouter = express.Router();

// create post
postRouter.post(
  "/create-post",
  authMiddleware,
  upload.single("image"),
  createPost,
);

// get all post
postRouter.get("/allposts", getAllPosts);

// delete post
postRouter.delete("/delete-post/:postId", authMiddleware, deletePost);

// like post
postRouter.put("/toggle-like/:postId", authMiddleware, toggleLikePost);

// Add comment Post
postRouter.post("/comment/:postId", authMiddleware, addCommentInPost);

// Add reply to comment Post
postRouter.post("/reply/:postId/:commentId", authMiddleware, addReplyInPost);

export default postRouter;
