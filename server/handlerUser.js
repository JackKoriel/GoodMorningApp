"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
//just incase I need it later
const { v4: uuidv4 } = require("uuid");

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
    console.log("Disconnected from Mongo");
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
      ? res.status(200).json({ status: 200, data: user.userDetails })
      : res.status(404).json({ status: 404, data: "User not found" });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong, please try again later.",
    });
  } finally {
    client.close();
    console.log("Disconnected from Mongo");
  }
};

//***************************
// GET user based on email at signin <<should add password>>
//***************************
const getUsersByEmail = async (req, res) => {
  //get the body from frontend
  const { handle, email, password } = req.body;
  //declair client in mongo
  const client = new MongoClient(MONGO_URI, options);

  //verifications of complete information
  if (!handle || !email || !password) {
    res.status(400).json({
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
    const user = await db.collection("users").findOne({ email });
    //verifications for provided user
    if (!user) {
      res.status(404).json({
        status: 404,
        data: "Incorrect user, please provide the correct email address.",
      });
    } else if (user.password !== password) {
      res
        .status(404)
        .json({ status: 404, data: "Incorrect password, please try again." });
    } else if (user.handle !== handle) {
      res
        .status(404)
        .json({ status: 404, data: "Incorrect username, please try again." });
    } else {
      res.status(200).json({ status: 200, data: user });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong, please try again later.",
    });
  } finally {
    client.close();
    console.log("Disconnected from Mongo");
  }
};

//***************************
// ADD a user in db
//***************************
const addUser = async (req, res) => {
  //get user information form front end using POST
  const { handle, email, password, displayName } = req.body;
  //declair client in mongo
  const client = new MongoClient(MONGO_URI, options);

  //some validations for provided information
  if (!handle || !password || !email || !displayName) {
    return res.status(400).json({
      status: 400,
      message: "Some info is missing, please fill all fields.",
    });
  } else if (!email.includes("@")) {
    return res.status(400).json({
      status: 400,
      message: "Please provide a valid email address.",
    });
  }
  //try catch finally function
  try {
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
        data: "Username already exist, please try a different username",
      });
    } else {
      //create the new user
      const newUser = await db
        .collection("users")
        .insertMany([{ ...req.body, _id }]);
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
    console.log("Disconnected from Mongo");
  }
};

//***************************
// UPDATE a user in db
//***************************
const updateUser = async (req, res) => {
  //get user information form front end using POST
  const { handle, email, password, displayName } = req.body;
  //get user handle from prams
  const { _id } = req.params;

  //giving the user comfortability in not providing all information at once but only these to be changed
  if (!handle) {
    value = {
      $set: { email, password, displayName },
    };
  } else if (!email) {
    value = {
      $set: { handle, password, displayName },
    };
  } else if (!password) {
    value = {
      $set: { handle, email, displayName },
    };
  } else if (!displayName) {
    value = {
      $set: { handle, email, password, displayName },
    };
  } else {
    value = {
      $set: { givenName, surname, email, seatId },
    };
  }

  //declair client in mongo
  const client = new MongoClient(MONGO_URI, options);

  //some validations for provided information
  if (!handle || !password || !email || !displayName) {
    return res.status(400).json({
      status: 400,
      message: "Some info is missing, please fill all fields.",
    });
  } else if (!email.includes("@")) {
    return res.status(400).json({
      status: 400,
      message: "Please provide a valid email address.",
    });
  }
  //try catch finally function
  try {
    //connect client
    await client.connect();
    //declair database in mongo
    const db = client.db("GoodMorningApp");
    //update the user with the provided values
    await db.collection("users").updateOne({ _id }, value);

    res.status(200).json({ status: 200, message: "Sucess" });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong, please try again later.",
    });
  } finally {
    client.close();
    console.log("Disconnected from Mongo");
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
};
