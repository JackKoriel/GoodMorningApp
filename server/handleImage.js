"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
//just incase I need it later
const { v4: uuidv4 } = require("uuid");

//import moment to use with user creation
const moment = require("moment");

// importing standard stuff
const { MongoClient } = require("mongodb");

// import the keys
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //   useFindAndModify: false,
  //   useCreateIndex: true,
};

// api functions

//***************************
// POST image
//***************************
const postImage = async (req, res) => {
  //get a specific user handle from params >>> this fetch will happen at the user's feed
  const { imageURL, imageId } = req.body;
  // const { image } = req.file.path;
  // console.log("formdata", formdata);
  // console.log("image", image);
  // console.log("req.file", req.file);
  //declare client in mongo
  const client = new MongoClient(MONGO_URI, options);
  //try catch finally function
  try {
    //connect client
    await client.connect();
    //declair database in mongo
    const db = client.db("GoodMorningApp");
    //create a new post by signed in user
    const newImage = await db.collection("images").insertOne({
      imageURL,
      _id: imageId,
    });
    res
      .status(201)
      .json({ status: 201, message: "Image added", data: newImage });
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
  postImage,
};
