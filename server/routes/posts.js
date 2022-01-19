const express = require("express");

const router = express.Router();

const { authRequired } = require("../helpers/authentication");

const {
  getPosts,
  getUserPosts,
  addPost,
  addLike,
  sharePost,
  deletePost,
  getUserFriendsPosts,
  getPostById,
} = require("../handlerPosts");

/////////////////////////////////////////////////////////////////////////////
// gets all posts in db
router.get("/api/posts", getPosts);

// gets one post by ID
router.get("/api/post/:_id", getPostById);

//gets posts made by a user
router.get("/api/:handle/feed", getUserPosts);

//gets posts made by a user
router.get("/api/:handle/friends-feed", authRequired, getUserFriendsPosts);
// router.get("/api/:handle/friends-feed", getUserFriendsPosts);

//add new postsmade by signedin user
router.post("/api/post", authRequired, addPost);

//like a specific post
router.patch("/api/post/:_id/like", authRequired, addLike);

//share a specific post
router.patch("/api/post/:postId/share", authRequired, sharePost);

//delete a post made by the user
router.delete("/api/post/:postId/delete", authRequired, deletePost);

module.exports = router;
/////////////////////////////////////////////////////////////////////////////
