import {
  addCommentPostService,
  addReplyPostService,
  createPostService,
  deletePostService,
  getAllPostsService,
  toggleLikePostService,
} from "../services/postService.js";

// CREATE POST
export const createPost = async (req, res) => {
  try {
    const post = await createPostService(req.body, req.file);
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET ALL POSTS
export const getAllPosts = async (req, res) => {
  try {
    const posts = await getAllPostsService();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE POST
export const deletePost = async (req, res) => {
  try {
    const message = await deletePostService(req.params.postId);
    res.status(200).json({ message });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// TOGGLE LIKE
export const toggleLikePost = async (req, res) => {
  try {
    const post = await toggleLikePostService(req.params.postId, req.userId);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ADD COMMENT
export const addCommentInPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { message } = req.body;

    const post = await addCommentPostService(postId, message, req.userId);

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ADD REPLY
export const addReplyInPost = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { message } = req.body;

    const post = await addReplyPostService(
      postId,
      commentId,
      message,
      req.userId,
    );

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
