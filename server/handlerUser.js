"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
//just incase I need it later
const { v4: uuidv4 } = require("uuid");

//import moment to use with user creation
const moment = require("moment");

//to encrypt stuff
const bcrypt = require("bcrypt");

// importing standard stuff
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// api functions

//***************************
// GET all users
//***************************
const getUsers = async (req, res) => {
  //declair client in mongo
  const client = new MongoClient(MONGO_URI, options);
  //try catch finally function
  try {
    //connect client
    await client.connect();
    //declair database in mongo
    const db = client.db("GoodMorningApp");
    //find all users
    const users = await db.collection("users").find().toArray();
    // validations and user control
    users
      ? res.status(200).json({ status: 200, data: users })
      : res.status(404).json({ status: 404, data: "Users not found" });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong, please try again later.",
    });
  } finally {
    client.close();
  }
};

//***************************
// GET current user
//***************************
const getUser = async (req, res) => {
  //express session after signing in
  let handle = req.session.handle;
  //declair client in mongo
  const client = new MongoClient(MONGO_URI, options);
  //try catch finally function
  try {
    //connect client
    await client.connect();
    //declair database in mongo
    const db = client.db("GoodMorningApp");
    //find current users
    const user = await db.collection("users").findOne({ handle });
    // validations and user control
    user
      ? res.status(200).json({ status: 200, data: user })
      : res.status(404).json({ status: 404, data: "No users logged in" });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong, please try again later.",
    });
  } finally {
    client.close();
  }
};

//***************************
// GET friend list of the current user
//***************************
const getUserFriends = async (req, res) => {
  //express session after signing in
  let handle = req.session.handle;
  //declair client in mongo
  const client = new MongoClient(MONGO_URI, options);
  //try catch finally function
  try {
    //connect client
    await client.connect();
    //declair database in mongo
    const db = client.db("GoodMorningApp");
    //find current user
    const user = await db.collection("users").findOne({ handle });
    //get user's friends array
    const friendsIdsArray = user.followingIds;
    if (friendsIdsArray) {
      const friendsObjectArray = await db
        .collection("users")
        .find({ handle: { $in: friendsIdsArray } })
        .toArray();
      res.status(200).json({ status: 200, data: friendsObjectArray });
    } else {
      res.status(404).json({ status: 404, data: "No users logged in" });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong, please try again later.",
    });
  } finally {
    client.close();
  }
};

//***************************
// GET user based on :handle
//***************************
const getUserByHandle = async (req, res) => {
  //get the handle from params
  const { handle } = req.params;
  //declair client in mongo
  const client = new MongoClient(MONGO_URI, options);
  //try catch finally function
  try {
    //connect client
    await client.connect();
    //declair database in mongo
    const db = client.db("GoodMorningApp");
    //find one user who has the handle
    const user = await db.collection("users").findOne({ handle });
    // validations and user control
    user
      ? res.status(200).json({ status: 200, data: user })
      : res.status(404).json({ status: 404, data: "User not found" });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong, please try again later.",
    });
  } finally {
    client.close();
  }
};

//***************************
// GET user based on :_id
//***************************
const getUserById = async (req, res) => {
  //get the handle from params
  const { _id } = req.params;
  //declair client in mongo
  const client = new MongoClient(MONGO_URI, options);
  //try catch finally function
  try {
    //connect client
    await client.connect();
    //declair database in mongo
    const db = client.db("GoodMorningApp");
    //find one user who has the handle
    const oneUser = await db.collection("users").findOne({ _id: _id });
    // validations and oneUser control
    oneUser
      ? res.status(200).json({ status: 200, data: oneUser })
      : res.status(404).json({ status: 404, data: "User not found" });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong, please try again later.",
    });
  } finally {
    client.close();
  }
};

//***************************
// GET <<LOGIN>> user based on email at signin
//***************************
const getUsersByEmail = async (req, res) => {
  //get the body from frontend
  const { handle, email, password } = req.body;

  // already logged in
  if (req.session.handle) {
    return res.status(400).json({
      status: 400,
      message: "User already logged in.",
    });
  }

  //declare client in mongo
  const client = new MongoClient(MONGO_URI, options);

  //verifications of complete information
  if (!handle || !email || !password) {
    return res.status(400).json({
      status: 400,
      message: "Some info is missing, please fill all fields.",
    });
  }

  //try catch finally function
  try {
    //connect client
    await client.connect();
    //declair database in mongo
    const db = client.db("GoodMorningApp");

    //find user in db based on email
    const user = await db
      .collection("users")
      .findOne({ email: email.toLowerCase() });
    //validate email
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "Incorrect user, please provide the correct email address.",
      });
    }
    // variable for passowrd validation
    const validPassword = await bcrypt.compare(password, user.password);
    //verifications for provided user
    if (!validPassword) {
      return res.status(404).json({
        status: 404,
        message: "Incorrect password, please try again.",
      });
    } else if (user.handle.toLowerCase() !== handle.toLowerCase()) {
      return res.status(404).json({
        status: 404,
        message: "Incorrect username, please try again.",
      });
    } else {
      req.session.handle = handle;
      req.session._id = user._id;
      req.session.email = email;
      res.status(200).json({ status: 200, data: user });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong, please try again.",
    });
  } finally {
    client.close();
  }
};

//***************************
//LOG OUT the user from the session
//***************************
const logoutUser = async (req, res) => {
  if (req.session.handle) {
    req.session.destroy();
    res.status(200).json({
      status: 200,
      data: `Logout was successful! Comeback soon!`,
    });
  } else {
    res.status(400).json({ status: 400, data: "No user logged in." });
  }
  res.end();
};

//***************************
// ADD a user in db <<sign up>>
//***************************
const addUser = async (req, res) => {
  //get user information form front end using POST
  const {
    handle,
    email,
    password,
    displayName,
    city,
    sign,
    country,
    avatarSrc,
    bannerSrc,
  } = req.body;
  //declare client in mongo
  const client = new MongoClient(MONGO_URI, options);
  let date = moment().format("MMM Do YY");
  //some validations for provided information
  if (
    !handle ||
    !password ||
    !email ||
    !displayName ||
    !city ||
    !country ||
    !sign ||
    !avatarSrc ||
    !bannerSrc
  ) {
    return res.status(400).json({
      status: 400,
      message: "Some info is missing, please fill all fields.",
    });
  } else if (!email.includes("@")) {
    return res.status(400).json({
      status: 400,
      message: "Please provide a valid email address.",
    });
  } else if (country.length > 2) {
    return res.status(400).json({
      status: 400,
      message: "Please provide only the country code, example: Canada = CA.",
    });
  }
  //try catch finally function
  try {
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    //add the hash to the password
    const hashPassword = await bcrypt.hash(password, salt);

    //create an id using UUID
    const _id = uuidv4();
    //connect client
    await client.connect();
    //declair database in mongo
    const db = client.db("GoodMorningApp");
    //find if there is a user with same username/handle
    const user = await db.collection("users").findOne({ handle });
    if (user) {
      res.status(409).json({
        status: 409,
        message: "Username already exists, please try a different username",
      });
    } else {
      //create the new user
      const newUser = await db.collection("users").insertMany([
        {
          ...req.body,
          password: hashPassword,
          _id,
          joined: date,
          bio: "",
          followingIds: [],
          followerIds: [],
          likeIds: [],
          favorite: [],
          readingList: [],
        },
      ]);
      res
        .status(201)
        .json({ status: 201, message: "New user created.", data: newUser });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong, please try again later.",
    });
  } finally {
    client.close();
  }
};

//***************************
// UPDATE a user in db
//***************************
const updateUser = async (req, res) => {
  //get user information form front end using POST
  const {
    handle,
    email,
    password,
    country,
    city,
    sign,
    avatarSrc,
    bannerSrc,
    displayName,
    bio,
  } = req.body;
  //get user handle from prams
  const { _id } = req.params;
  //verify user updating their profile and not other usersr
  if (req.session._id !== _id) {
    return res.status(401).json({
      status: 401,
      data: "Not authorized to update other users' data.",
    });
  }

  let hashPassword;
  if (password) {
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    //add the hash to the password
    hashPassword = await bcrypt.hash(password, salt);
  }
  //declaring a value to use later with $set while updating the user
  let value = {
    handle,
    email,
    password: hashPassword,
    city,
    sign,
    country,
    avatarSrc,
    bannerSrc,
    displayName,
    bio,
  };
  //the array will use foreach to check which element was provided by the user
  let array = [
    "handle",
    "email",
    "password",
    "displayName",
    "city",
    "sign",
    "country",
    "avatarSrc",
    "bannerSrc",
    "displayName",
    "bio",
  ];
  array.forEach((element) => {
    if (!req.body[element]) {
      delete value[element];
    }
  });
  if (Object.keys(value).length === 0) {
    return res.status(400).json({
      status: 400,
      message: "No information is selected to perfom an update",
    });
  }
  // validating email
  if (value.email && !value.email?.includes("@")) {
    return res.status(400).json({
      status: 400,
      message: "Please provide a valid email address.",
    });
  }
  //declair client in mongo
  const client = new MongoClient(MONGO_URI, options);
  //try catch finally function
  try {
    //connect client
    await client.connect();
    //declair database in mongo
    const db = client.db("GoodMorningApp");
    //validating the handle availability
    const userHandle = await db.collection("users").findOne({ handle });
    if (userHandle) {
      return res.status(409).json({
        status: 409,
        data: "Username already exist, please try a different username",
      });
    }
    //update the user with the provided values
    const updatedUser = await db
      .collection("users")
      .updateOne({ _id }, { $set: { ...value } });
    res.status(200).json({ status: 200, message: "Sucess", data: updatedUser });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong, please try again.",
    });
  } finally {
    client.close();
  }
};

//***************************
// ADD friend/follow a friend
//***************************
const addFollower = async (req, res) => {
  //get the friend's handle from the params when in the friend's profile
  const { handle: friendHandle } = req.params;
  //express session after signing in
  let userHandle = req.session.handle;
  //declair client in mongo
  const client = new MongoClient(MONGO_URI, options);

  //try catch finally function
  try {
    //connect client
    await client.connect();
    //declair database in mongo
    const db = client.db("GoodMorningApp");
    //updating the user's array with the friend added
    const user = await db
      .collection("users")
      .updateOne(
        { handle: userHandle },
        { $addToSet: { followingIds: friendHandle } }
      );
    //updating the friend's array with the user added
    const friend = await db
      .collection("users")
      .updateOne(
        { handle: friendHandle },
        { $addToSet: { followerIds: userHandle } }
      );
    res
      .status(201)
      .json({ status: 201, message: "Friend added.", data: { user, friend } });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong, please try again later.",
    });
  } finally {
    client.close();
  }
};

//***************************
// REMOVE friend/follower
//***************************
const removeFolower = async (req, res) => {
  //get the friend's handle from the params when in the friend's profile
  const { handle: friendHandle } = req.params;
  //express session after signing in
  let userHandle = req.session.handle;
  //declair client in mongo
  const client = new MongoClient(MONGO_URI, options);

  //try catch finally function
  try {
    //connect client
    await client.connect();
    //declair database in mongo
    const db = client.db("GoodMorningApp");
    //updating the user's array with the friend added
    const user = await db
      .collection("users")
      .updateOne(
        { handle: userHandle },
        { $pull: { followingIds: friendHandle } }
      );
    //updating the friend's array with the user added
    const friend = await db
      .collection("users")
      .updateOne(
        { handle: friendHandle },
        { $pull: { followerIds: userHandle } }
      );
    res.status(201).json({
      status: 201,
      message: "Friend removed.",
      data: { user, friend },
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong, please try again later.",
    });
  } finally {
    client.close();
  }
};

//get bacon function to test server
const getBacon = async (req, res) => {
  res.status(200).json("🥓");
};
module.exports = {
  getUserByHandle,
  getBacon,
  getUsers,
  getUsersByEmail,
  addUser,
  updateUser,
  addFollower,
  removeFolower,
  logoutUser,
  getUser,
  getUserFriends,
  getUserById,
};
