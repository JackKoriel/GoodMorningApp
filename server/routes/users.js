const express = require("express");

const router = express.Router();

const { authRequired } = require("../helpers/authentication");

const {
  getBacon,
  getUserByHandle,
  getUsersByEmail,
  getUsers,
  addUser,
  updateUser,
  addFollower,
  removeFolower,
  logoutUser,
  getUser,
  getUserFriends,
} = require("../handlerUser");

/////////////////////////////////////////////////////////////////////////////
//get bacon for testing server:
router.get("/api/bacon", getBacon);

// gets all users in db
router.get("/api/users", getUsers);

// gets one user from the server by using the handle
router.get("/api/users/:handle", getUserByHandle);

// gets one user from the server by using the email and name while in the signin process
router.post("/api/signin", getUsersByEmail);

// logout user from the session
router.get("/api/logout", logoutUser);

// gets one user from the server by using the email and name while in the signin process
router.post("/api/signup", addUser);

// update user's basic information at the settings in the profile page
router.post("/api/profile/:_id", authRequired, updateUser);

// add follower to followers list
router.patch("/api/:_handle/profile/follow", authRequired, addFollower);

// remove follower from followers list
router.patch("/api/:_handle/profile/unfollow", authRequired, removeFolower);

//get current user
router.get("/api/user", getUser);

// gets current user friends in db
router.get("/api/friends/handle", getUserFriends);

module.exports = router;
/////////////////////////////////////////////////////////////////////////////
