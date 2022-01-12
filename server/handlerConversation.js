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
// GET conversation of user
//***************************
const getConversation = async (req, res) => {
  //get a specific user id from params
  const { userId } = req.params;
  //declare client in mongo
  const client = new MongoClient(MONGO_URI, options);
  //try catch finally function
  try {
    //connect client
    await client.connect();
    //declare database in mongo
    const db = client.db("GoodMorningApp");
    //find conversations
    const conversations = await db
      .collection("conversations")
      .find({ members: { $in: [userId] } })
      .toArray();
    // validations and user control
    conversations
      ? res.status(200).json({ status: 200, data: conversations })
      : res
          .status(404)
          .json({ status: 404, message: "Conversations not found" });
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
// GET conversation of 2 user id's
//***************************
const getCouplesConversation = async (req, res) => {
  //get a specific user id from params
  const { userId, friendId } = req.params;
  //declare client in mongo
  const client = new MongoClient(MONGO_URI, options);
  //try catch finally function
  try {
    //connect client
    await client.connect();
    //declare database in mongo
    const db = client.db("GoodMorningApp");
    //find conversations
    const conversation = await db
      .collection("conversations")
      .findOne({ members: { $all: [userId, friendId] } })
      .toArray();
    // validations and user control
    conversation
      ? res.status(200).json({ status: 200, data: conversation })
      : res
          .status(404)
          .json({ status: 404, message: "Conversation not found" });
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
// POST new conversation
//***************************
const addConversation = async (req, res) => {
  //get a the user and send IDs from frontEnd
  const { senderId, receiverId } = req.body;
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
    //find if a conversation already exist
    const conversation = await db
      .collection("conversations")
      .findOne({ members: { $all: [senderId, receiverId] } });
    // validations
    if (conversation) {
      return res.status(200).json({
        status: 200,
        message: "Conversation already created.",
        data: conversation,
      });
    } else {
      const newConversation = await db.collection("conversations").insertOne({
        members: [senderId, receiverId],
        _id,
        timestamp: moment().format(),
        sortedTimestamp: date,
      });
      return res.status(201).json({
        status: 201,
        message: "New conversation created.",
        data: newConversation,
      });
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

module.exports = {
  getConversation,
  addConversation,
  getCouplesConversation,
};
