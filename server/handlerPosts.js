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
  //declare client in mongo
  const client = new MongoClient(MONGO_URI, options);
  //try catch finally function
  try {
    //connect client
    await client.connect();
    //declare database in mongo
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
  }
};

//***************************
// GET post by ID
//***************************
const getPostById = async (req, res) => {
  //get post id from params with the patch
  const { _id } = req.params;
  //declare client in mongo
  const client = new MongoClient(MONGO_URI, options);
  //try catch finally function
  try {
    //connect client
    await client.connect();
    //declare database in mongo
    const db = client.db("GoodMorningApp");
    //find user's post
    const post = await db.collection("posts").findOne({ _id });
    // validations and user control
    post
      ? res.status(200).json({ status: 200, data: post })
      : res.status(404).json({ status: 404, message: "post not found" });
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
// GET posts by a specific user
//***************************
const getUserPosts = async (req, res) => {
  //get a specific user handle from params >>> this fetch will happen at the user's feed
  const { handle } = req.params;
  //declare client in mongo
  const client = new MongoClient(MONGO_URI, options);
  //try catch finally function
  try {
    //connect client
    await client.connect();
    //declare database in mongo
    const db = client.db("GoodMorningApp");
    //find all users
    const userPosts = await db
      .collection("posts")
      .find({ authorHandle: handle })
      .sort({ timestamp: -1 })
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
  }
};

//***************************
// GET posts by the user's friends/following posts
//***************************
const getUserFriendsPosts = async (req, res) => {
  //get a specific user handle from params >>> this fetch will happen at the user's feed
  const { handle } = req.params;
  //declare client in mongo
  const client = new MongoClient(MONGO_URI, options);
  //try catch finally function
  try {
    //connect client
    await client.connect();
    //declare database in mongo
    const db = client.db("GoodMorningApp");
    //find current user
    const user = await db.collection("users").findOne({ handle });
    //get user's friends array
    let friendsIdsArray = user.followingIds;
    //add the user id to the array
    friendsIdsArray.push(handle);
    //find all posts from friends the user follow
    const friendsPosts = await db
      .collection("posts")
      .find({ authorHandle: { $in: friendsIdsArray } })
      .sort({ timestamp: -1 })
      .toArray();
    // validations and user control

    const updatedFriendsPosts = await Promise.all(
      friendsPosts.map(async (post) => {
        const updatedUser = await db
          .collection("users")
          .findOne({ _id: post.author._id });
        post.author = updatedUser;
        return post;
      })
    );

    updatedFriendsPosts.length !== 0
      ? res.status(200).json({ status: 200, data: updatedFriendsPosts })
      : res.status(404).json({ status: 404, message: "Posts not found" });
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
// POST a new post from signed in user
//***************************
const addPost = async (req, res) => {
  //express session after signing in
  let handle = req.session.handle;
  //get a specific user handle from params >>> this fetch will happen at the user's feed
  const { status, imageURL } = req.body;
  //declare client in mongo
  const client = new MongoClient(MONGO_URI, options);
  let date = moment().format("MMM Do YY");
  //try catch finally function
  try {
    //create an id using UUID
    const _id = uuidv4();
    //connect client
    await client.connect();
    //declare database in mongo
    const db = client.db("GoodMorningApp");
    //find current user
    const user = await db.collection("users").findOne({ handle });
    //create a new post by signed in user
    const newPost = await db.collection("posts").insertOne({
      status,
      author: user,
      media: [{ type: "img", url: imageURL }],
      _id,
      authorHandle: handle,
      timestamp: moment().format(),
      sortedTimestamp: date,
      likedBy: [],
      sharedBy: [],
      numLikes: 0,
      numReshares: 0,
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
  }
};

//***************************
// PATCH likes on a specific post
//***************************
const addLike = async (req, res) => {
  //express session after signing in
  let handle = req.session.handle;
  //get post ID from params
  const { _id } = req.params;
  //getting the boolean value from FE to use for keeping the button colored
  const { like } = req.body;
  //declare client in mongo
  const client = new MongoClient(MONGO_URI, options);
  //try catch finally function
  try {
    //connect client
    await client.connect();
    //declare database in mongo
    const db = client.db("GoodMorningApp");
    //update the like status by the user
    await db
      .collection("posts")
      .updateOne({ _id }, { $set: { isLiked: like } });

    //declare post outside the condition
    let post;
    //updating the user's liked array in the post
    if (like === false) {
      post = await db
        .collection("posts")
        .updateOne({ _id }, { $pull: { likedBy: handle } });
    } else {
      post = await db
        .collection("posts")
        .updateOne({ _id }, { $addToSet: { likedBy: handle } });
    }

    res.status(200).json({ status: 200, message: "Post liked!", data: post });
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
// PATCH reshare posts in the user's feed
//***************************
const sharePost = async (req, res) => {
  //express session after signing in
  let handle = req.session.handle;
  //get post ID from params
  const { postId } = req.params;
  //getting the boolean value from FE to use for keeping the button colored
  const { shared } = req.body;

  //declare client in mongo
  const client = new MongoClient(MONGO_URI, options);
  let date = moment().format("MMM Do YY");
  //try catch finally function
  try {
    //create an id using UUID
    const _id = uuidv4();
    //connect client
    await client.connect();
    //declare database in mongo
    const db = client.db("GoodMorningApp");
    //find current user
    const user = await db.collection("users").findOne({ handle });
    // find the post data by looking up its ID
    const friendPostData = await db
      .collection("posts")
      .findOne({ _id: postId });
    //update the share status by the user
    await db
      .collection("posts")
      .updateOne({ _id: postId }, { $set: { isShared: shared } });
    //updating the friend's reshare array in the post
    await db
      .collection("posts")
      .updateOne({ _id: postId }, { $addToSet: { sharedBy: handle } });

    //add the shared post under the current user's name
    const newPostUser = await db.collection("posts").insertOne({
      author: user,
      _id,
      authorHandle: handle,
      timestamp: moment().format(),
      sortedTimestamp: date,
      likedBy: [],
      reshareOf: postId,
      status: friendPostData.status,
      media: friendPostData.media,
      originalAuthor: friendPostData.author.handle,
      originalTimeStamp: friendPostData.timestamp,
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
  }
};

//***************************
// DELETE a post fron user's feed
//***************************
const deletePost = async (req, res) => {
  //express session after signing in
  let handle = req.session.handle;
  //get post ID from params
  const { postId } = req.params;
  //get original post ID from FE if this was a shared post
  const { originId } = req.body;

  //declare client in mongo
  const client = new MongoClient(MONGO_URI, options);
  //try catch finally function
  try {
    //connect client
    await client.connect();
    //declare database in mongo
    const db = client.db("GoodMorningApp");
    //update all reshares with new message stating the original post was deleted
    const sharedPostsUpdate = await db.collection("posts").updateMany(
      { reshareOf: postId },
      {
        $set: {
          status: "The original post has been deleted by the user",
          media: [],
        },
      }
    );
    //update original post if the deleted post was shared from it
    if (originId !== undefined) {
      await db
        .collection("posts")
        .updateOne({ _id: originId }, { $pull: { sharedBy: handle } });

      await db
        .collection("posts")
        .updateOne({ _id: originId }, { $set: { isShared: false } });
    }

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
  }
};

module.exports = {
  getPosts,
  getUserPosts,
  addPost,
  addLike,
  sharePost,
  deletePost,
  getUserFriendsPosts,
  getPostById,
};
