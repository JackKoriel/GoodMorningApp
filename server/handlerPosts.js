"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
//just incase I need it later
const { v4: uuidv4 } = require("uuid");

//import moment to use with user creation
const moment = require("moment");

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
// GET all posts
//***************************
const getPosts = async (req, res) => {
  //declair client in mongo
  const client = new MongoClient(MONGO_URI, options);
  //try catch finally function
  try {
    //connect client
    await client.connect();
    //declair database in mongo
    const db = client.db("GoodMorningApp");
    //find all users
    const posts = await db.collection("posts").find().toArray();
    // validations and user control
    posts
      ? res.status(200).json({ status: 200, data: posts })
      : res.status(404).json({ status: 404, message: "Posts not found" });
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
// GET posts by a specific user
//***************************
const getUserPosts = async (req, res) => {
  //get a specific user handle from params >>> this fetch will happen at the user's feed
  const { handle } = req.params;
  //declair client in mongo
  const client = new MongoClient(MONGO_URI, options);
  //try catch finally function
  try {
    //connect client
    await client.connect();
    //declair database in mongo
    const db = client.db("GoodMorningApp");
    //find all users
    const userPosts = await db
      .collection("posts")
      .find({ authorHandle: handle })
      .toArray();
    // validations and user control

    userPosts
      ? res.status(200).json({ status: 200, data: userPosts })
      : res.status(404).json({ status: 404, message: "Posts not found" });
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
// POST a new post from signed in user
//***************************
const addPost = async (req, res) => {
  //get a specific user handle from params >>> this fetch will happen at the user's feed
  const { status } = req.body;
  //declair client in mongo
  const client = new MongoClient(MONGO_URI, options);
  let date = moment().format("MMM Do YY");
  //try catch finally function
  try {
    //create an id using UUID
    const _id = uuidv4();
    //connect client
    await client.connect();
    //declair database in mongo
    const db = client.db("GoodMorningApp");

    //create a new post by signed in user
    const newPost = await db.collection("posts").insertOne({
      ...req.body,
      _id,
      //use express session to get the signedin user handle
      //   authorHandle: req.session.handle,
      authorHandle: "",
      timestamp: moment().format(),
      sortedTimestamp: date,
      likedBy: [],
      retweetedBy: [],
      media: [],
    });
    res
      .status(201)
      .json({ status: 201, message: "New post created.", data: newPost });
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
// PATCH likes on a specific post
//***************************
const addLike = async (req, res) => {
  //get post ID from params
  const { _id } = req.params;
  //get the user's handle after clicking on the add button when using POST with the body
  //I can use express session
  const { handle: userHandle } = req.body;
  //declair client in mongo
  const client = new MongoClient(MONGO_URI, options);
  //try catch finally function
  try {
    //connect client
    await client.connect();
    //declair database in mongo
    const db = client.db("GoodMorningApp");

    //updating the user's liked array in the post
    const post = await db
      .collection("posts")
      .updateOne({ _id }, { $addToSet: { likedBy: userHandle } });

    res.status(200).json({ status: 200, message: "Post liked!", data: post });
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
// PATCH reshare posts in the user's feed
//***************************
const sharePost = async (req, res) => {
  //get post ID from params
  const { postId } = req.params;
  //get the user's handle after clicking on the add button when using POST with the body
  //I can use express session
  const { handle: userHandle } = req.body;
  //declair client in mongo
  const client = new MongoClient(MONGO_URI, options);
  let date = moment().format("MMM Do YY");
  //try catch finally function
  try {
    //create an id using UUID
    const _id = uuidv4();
    //connect client
    await client.connect();
    //declair database in mongo
    const db = client.db("GoodMorningApp");

    // find the post data by looking up its ID
    const friendPostData = await db
      .collection("posts")
      .findOne({ _id: postId });
    console.log(friendPostData);
    //updating the friend's retweet array in the post
    const friendPostUpdate = await db
      .collection("posts")
      .updateOne({ _id: postId }, { $addToSet: { retweetedBy: userHandle } });

    //add the shared post under the current user's name
    const newPostUser = await db.collection("posts").insertOne({
      _id,
      authorHandle: userHandle,
      timestamp: moment().format(),
      sortedTimestamp: date,
      likedBy: [],
      retweetOf: postId,
      status: friendPostData.status,
      media: friendPostData.media,
    });
    res
      .status(200)
      .json({ status: 200, message: "Post shared!", data: newPostUser });
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
// DELETE a post fron user's feed
//***************************
const deletePost = async (req, res) => {
  //get post ID from params
  const { postId } = req.params;
  //declair client in mongo
  const client = new MongoClient(MONGO_URI, options);
  //try catch finally function
  try {
    //connect client
    await client.connect();
    //declare database in mongo
    const db = client.db("GoodMorningApp");
    //update all retweets with new message stating the original post was deleted
    const sharedPostsUpdate = await db.collection("posts").updateMany(
      { retweetOf: postId },
      {
        $set: {
          status: "The original post has been deleted by the user",
          media: [],
        },
      }
    );

    const deletedPost = await db.collection("posts").deleteOne({ _id: postId });
    res.status(200).json({
      status: 200,
      data: deletedPost,
      message: "Post deleted.",
    });
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

module.exports = {
  getPosts,
  getUserPosts,
  addPost,
  addLike,
  sharePost,
  deletePost,
};
