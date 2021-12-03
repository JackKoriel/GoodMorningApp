"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
//just incase I need it later
const { v4: uuidv4 } = require("uuid");

//importing standard stuff
// const { MongoClient } = require("mongodb");

// require("dotenv").config();
// const { MONGO_URI } = process.env;

// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// api functions
// gets a single item by id# from server -----------------------------------

const getUsers = async (req, res) => {
  //     //declaring a variable to use in my res status
  //     let displayedData;
  //     //getting the queries from the user
  //     let { start, limit } = req.query;
  //     //we change to Numbers because queries come in string form
  //     let startNum = Number(start);
  //     let limitNum = Number(limit);
  //     //this will be usefull for the calcs later
  //     let bothLimits = Number(start) + Number(limit);
  //     const client = new MongoClient(MONGO_URI, options);
  //     try {
  //       await client.connect();
  //       const db = client.db("GroupProject");
  //       const results = await db.collection("items").find().toArray();
  //       // validations and user control
  //       if (results.length === 0) {
  //         res.status(404).json({ status: 404, data: "Items not found" });
  //       }
  //       if (!limit && !start) {
  //         displayedData = results.slice(0, 9);
  //       } else if (!limit) {
  //         displayedData = results.slice(startNum, startNum + 9);
  //       } else if (!start || start > results.length) {
  //         displayedData = results.slice(0, limitNum);
  //       } else if (startNum + limitNum > results.length) {
  //         displayedData = results.slice(startNum, results.length + 1);
  //       } else {
  //         displayedData = results.slice(startNum, startNum + limitNum);
  //       }
  //       res.status(200).json({
  //         status: 200,
  //         message: "Success",
  //         data: displayedData,
  //       });
  //     } catch (err) {
  //       res.status(500).json({
  //         status: 500,
  //         message: "Something went wrong, please try again later.",
  //       });
  //     } finally {
  //       client.close();
  //     }
};

//get bacon function to test server
const getBacon = async (req, res) => {
  res.status(200).json("🥓");
};

module.exports = {
  getUsers,
  getBacon,
};
