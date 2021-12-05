const express = require("express");

const router = express.Router();

const {
  getBacon,
  getUserByHandle,
  getUsersByEmail,
  getUsers,
  addUser,
  updateUser,
} = require("../handlerUser");

/////////////////////////////////////////////////////////////////////////////
//get bacon for testing server:
router.get("/api/bacon", getBacon);

// gets all users in db
router.get("/api/signin", getUsers);

// gets one user from the server by using the handle
router.get("/api/users/:handle", getUserByHandle);

// gets one user from the server by using the email and name while in the signin process
router.get("/api/signin", getUsersByEmail);

// gets one user from the server by using the email and name while in the signin process
router.post("/api/signup", addUser);

// update user's basic information at the settings in the profile page
router.post("/api/profile/_id", updateUser);

module.exports = router;
/////////////////////////////////////////////////////////////////////////////
