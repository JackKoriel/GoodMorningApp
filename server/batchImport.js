const { MongoClient } = require("mongodb");
const { users, posts } = require("./data");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db(`GoodMorningApp`);

    //get only a key from the data to user later as an ID in Mongo
    const userHandles = Object.keys(users);

    //rearrange data in mongo to have id with user handle then user details in an object
    const userData = userHandles.map((handle) => {
      return { _id: handle, userDetails: users[handle] };
    });

    await db.collection("users").insertMany(userData);

    await db.collection("posts").insertMany(posts);
  } catch (err) {
    console.log("error", err);
  } finally {
    client.close();
    console.log("disconnected!");
  }
};

batchImport();
