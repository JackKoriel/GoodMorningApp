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
const getMessages = async (req, res) => {
  //get a specific conversation id from frontend
  const { conversationId } = req.params;
  //declare client in mongo
  const client = new MongoClient(MONGO_URI, options);
  //try catch finally function
  try {
    //connect client
    await client.connect();
    //declare database in mongo
    const db = client.db("GoodMorningApp");
    //find messages
    const messages = await db
      .collection("messages")
      .find({ conversationId: conversationId })
      .toArray();
    // validations and user control
    messages
      ? res.status(200).json({ status: 200, data: messages })
      : res.status(404).json({ status: 404, message: "Messages not found" });
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
// POST new message
//***************************
const addMessage = async (req, res) => {
  //express session after signing in
  //   let handle = req.session.handle;
  //get a the message from the frontEnd
  const { conversationId, sender, text } = req.body;
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
    // const user = await db.collection("users").findOne({ handle });
    //create a new post by signed in user
    const newMessage = await db.collection("messages").insertOne({
      conversationId,
      sender,
      text,
      _id,
      timestamp: moment().format(),
      sortedTimestamp: date,
    });
    res.status(201).json({
      status: 201,
      message: "New message created.",
      data: newMessage,
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
  addMessage,
  getMessages,
};
