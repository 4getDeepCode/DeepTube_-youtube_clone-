import uploadOnCloudinary from "../config/cloudinary.js";
import Channel from "../models/channelModel.js";
import Post from "../models/postModel.js";


// CREATE POST
export const createPostService = async (body, file) => {
  const { channelId, content } = body;

  if (!channelId || !content) {
    throw new Error("Channel ID and content are required");
  }

  let imageUrl = null;

  if (file) {
    imageUrl = await uploadOnCloudinary(file.path);
  }

  const newPost = await Post.create({
    channel: channelId,
    content,
    image: imageUrl,
  });

  await Channel.findByIdAndUpdate(channelId, {
    $push: { communityPosts: newPost._id },
  });

  return newPost;
};


// GET ALL POSTS
export const getAllPostsService = async () => {
  const posts = await Post.find()
    .populate("channel comments.author comments.replies.author")
    .sort({ createdAt: -1 });

  return posts;
};


// DELETE POST
export const deletePostService = async (postId) => {
  const post = await Post.findById(postId);
  if (!post) throw new Error("Post not found");

  await Channel.findByIdAndUpdate(post.channel, {
    $pull: { communityPosts: post._id }
  });

  await Post.findByIdAndDelete(postId);

  return "Post deleted successfully";
};


// TOGGLE LIKE
export const toggleLikePostService = async (postId, userId) => {
  const post = await Post.findById(postId);
  if (!post) throw new Error("Post not found");

  if (post.likes.includes(userId)) {
    post.likes.pull(userId);
  } else {
    post.likes.push(userId);
  }

  await post.save();
  return post;
};


// ADD COMMENT
export const addCommentPostService = async (postId, message, userId) => {
  const post = await Post.findById(postId);
  if (!post) throw new Error("Post not found");

  post.comments.push({ author: userId, message });
  await post.save();

  const populatedPost = await Post.findById(postId)
    .populate("comments.author", "username photoUrl email")
    .populate("comments.replies.author", "username photoUrl email");

  return populatedPost;
};


// ADD REPLY
export const addReplyPostService = async (postId, commentId, message, userId) => {
  const post = await Post.findById(postId);
  if (!post) throw new Error("Post not found");

  const comment = post.comments.id(commentId);
  if (!comment) throw new Error("Comment not found");

  comment.replies.push({ author: userId, message });
  await post.save();

  const populatedPost = await Post.findById(postId)
    .populate("comments.author", "username photoUrl email")
    .populate("comments.replies.author", "username photoUrl email");

  return populatedPost;
};