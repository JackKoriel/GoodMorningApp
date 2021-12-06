const express = require("express");

const router = express.Router();

const {
  getBacon,
  getUserByHandle,
  getUsersByEmail,
  getUsers,
  addUser,
  updateUser,
  addFollower,
  removeFolower,
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

// gets one user from the server by using the email and name while in the signin process
router.post("/api/signup", addUser);

// update user's basic information at the settings in the profile page
router.post("/api/profile/:_id", updateUser);

// add follower to followers list
router.patch("/api/:_handle/profile/follow", addFollower);

// remove follower from followers list
router.patch("/api/:_handle/profile/unfollow", removeFolower);

module.exports = router;
/////////////////////////////////////////////////////////////////////////////
