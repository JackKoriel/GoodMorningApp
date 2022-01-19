"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
//just incase I need it later
const { v4: uuidv4 } = require("uuid");

//import request to use with api's
const request = require("request");

//import moment to use with user creation
const moment = require("moment");

// importing standard stuff
const { MongoClient } = require("mongodb");

// import the keys
require("dotenv").config();
const { MONGO_URI, API_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// api functions

//***************************
// GET horoscope
//***************************
const getHoroscope = async (req, res) => {
  const { sign, day } = req.body;
  try {
    const options = {
      method: "POST",
      url: "https://sameer-kumar-aztro-v1.p.rapidapi.com/",
      qs: { sign, day },
      headers: {
        "x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com",
        "x-rapidapi-key": API_URI,
        useQueryString: true,
      },
    };
    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      const results = JSON.parse(body);
      res.status(200).json({ status: 200, data: results });
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong, please try again later.",
    });
  } finally {
    // client.close();
  }
};

//***************************
// GET weather
//***************************
const getWeather = async (req, res) => {
  const { city } = req.body;
  try {
    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
      qs: { q: city, days: "3" },
      headers: {
        "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
        "x-rapidapi-key": API_URI,
        useQueryString: true,
      },
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      const results = JSON.parse(body);
      res.status(200).json({ status: 200, data: results });
    });
    //send data to mongo
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong, please try again later.",
    });
  } finally {
    // client.close();
  }
};

//***************************
// GET news
//***************************
const getNews = async (req, res) => {
  const { lang, country } = req.body;

  try {
    const options = {
      method: "GET",
      url: "https://newscatcher.p.rapidapi.com/v1/latest_headlines",
      qs: { lang, country, media: "True" },
      headers: {
        "x-rapidapi-host": "newscatcher.p.rapidapi.com",
        "x-rapidapi-key": API_URI,
        useQueryString: true,
      },
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      const results = JSON.parse(body);

      //create an id using UUID
      const _id = uuidv4();

      res.status(200).json({ status: 200, data: results.articles });
    });
    //send data to mongo
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Something went wrong, please try again later.",
    });
  } finally {
    // client.close();
  }
};

//***************************
// ADD horoscope to favority collection
//***************************
const addToFav = async (req, res) => {
  // get user handle from express session
  let handle = req.session.handle;
  //get horoscope information form horoscope page using POST
  const { dailyHoro, email } = req.body;
  //declare client in mongo
  const client = new MongoClient(MONGO_URI, options);
  let date = moment().format("MMM Do YY");
  //try catch finally function
  try {
    //create an id using UUID
    const horoscopeId = uuidv4();
    //connect client
    await client.connect();
    //declare database in mongo
    const db = client.db("GoodMorningApp");
    // ------------------------------
    // find a horoscope with today's date has already been added to the horoscopes collection
    const dailyFav = await db.collection("horoscope").findOne({ date });
    if (dailyFav) {
      res.status(409).json({
        status: 409,
        message: "A daily horoscope has already been added for today.",
      });
    } else {
      //add the horoscope to the horoscope collection
      const newfavHoro = await db.collection("horoscope").insertOne({
        ...dailyHoro,
        email,
        date,
        _id: horoscopeId,
      });
      //-------------------------------
      //updating the user's favorite array with the horoscope added
      const user = await db
        .collection("users")
        .updateOne(
          { handle },
          { $addToSet: { favorite: dailyHoro.current_date } }
        );
      res.status(201).json({
        status: 201,
        message: "Daily horoscope has been added to the favorite menu.",
        data: newfavHoro,
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

//***************************
// REMOVE horoscope from fav
//***************************
const removeFav = async (req, res) => {
  //get the horoscope id from the params when opening favorites page or horoscope details in favorit
  const { horoId } = req.params;
  // get user handle from express session
  let handle = req.session.handle;

  //the horoscopes originally didn't have an id so we use the current date instead
  const { current_date } = req.body;
  //declare client in mongo
  const client = new MongoClient(MONGO_URI, options);

  //try catch finally function
  try {
    //connect client
    await client.connect();
    //declare database in mongo
    const db = client.db("GoodMorningApp");
    //removing the horoscope id from user's fav array
    const user = await db
      .collection("users")
      .updateOne({ handle }, { $pull: { favorite: current_date } });
    // we provide an id using uuid for the favority collection so we can use the id to delete
    const removedHoro = await db
      .collection("horoscope")
      .deleteOne({ _id: horoId });
    res.status(200).json({
      status: 200,
      data: removedHoro,
      message: "Horoscope removed.",
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

//***************************
// GET all favs
//***************************
const getFav = async (req, res) => {
  //get use's email from session
  const email = req.session.email;
  //declaring a variable to use in my res status
  let displayedData = [];
  //getting the queries from the user
  let { start, limit } = req.query;
  //we change to Numbers because queries come in string form
  let startNum = Number(start);
  let limitNum = Number(limit);
  //this will be usefull for the calcs later
  let bothLimits = Number(start) + Number(limit);

  //declare client in mongo
  const client = new MongoClient(MONGO_URI, options);
  //try catch finally function
  try {
    //connect client
    await client.connect();
    //declare database in mongo
    const db = client.db("GoodMorningApp");
    //find all favorites
    const horoscopes = await db
      .collection("horoscope")
      .find({ email })
      .sort({ current_date: -1 })
      .toArray();
    // validations and user control
    //I can use below if I don't want pagination
    // horoscopes.length > 0
    //   ? res.status(200).json({ status: 200, data: horoscopes })
    //   : res
    //       .status(404)
    //       .json({ status: 404, message: "Favorite Horoscopes not found" });

    //   // validations and user control
    // everything below is for pagination
    if (horoscopes.length === 0) {
      return res.status(404).json({
        status: 404,
        data: displayedData,
        message: "Favorite Horoscopes not found",
      });
    }
    if (!limit && !start) {
      displayedData = horoscopes;
    } else if (!limit) {
      displayedData = horoscopes.slice(startNum, startNum + 3);
    } else if (!start) {
      displayedData = horoscopes.slice(0, limitNum);
    } else if (startNum + limitNum > horoscopes.length) {
      displayedData = horoscopes.slice(startNum, horoscopes.length + 1);
    } else if (startNum > horoscopes.length) {
      return (displayedData = []);
    } else {
      displayedData = horoscopes.slice(startNum, startNum + limitNum);
    }
    res.status(200).json({
      status: 200,
      length: displayedData.length,
      message: "Success",
      data: displayedData,
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

//***************************
// ADD articles to reading list collection
//***************************
const addToReading = async (req, res) => {
  // get user handle from express session
  let handle = req.session.handle;
  //get the article and email from front end
  const { article, email } = req.body;
  //declare client in mongo
  const client = new MongoClient(MONGO_URI, options);
  //try catch finally function
  try {
    //connect client
    await client.connect();
    //declare database in mongo
    const db = client.db("GoodMorningApp");
    // ------------------------------
    // find if the same news has already been added
    const newsRL = await db.collection("news").findOne({ _id: article._id });
    if (newsRL) {
      res.status(409).json({
        status: 409,
        message: "The article has already been added to reading list.",
      });
    } else {
      //add the article to the news array in that user's data
      const newArctileReading = await db.collection("news").insertOne({
        ...article,
        email,
      });
      //-------------------------------
      //updating the user's news array with the article ID
      const user = await db
        .collection("users")
        .updateOne({ handle }, { $addToSet: { readingList: article._id } });
      res.status(201).json({
        status: 201,
        message: "Article has been added to reading list.",
        data: newArctileReading,
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

//***************************
// REMOVE an article from Reading List
//***************************
const removeArticleFromRL = async (req, res) => {
  //get the news id from the params
  const { _id } = req.params;
  // get user handle from express session
  let handle = req.session.handle;
  //declare client in mongo
  const client = new MongoClient(MONGO_URI, options);

  //try catch finally function
  try {
    //connect client
    await client.connect();
    //declare database in mongo
    const db = client.db("GoodMorningApp");
    //removing the news id from user's reading list
    const user = await db
      .collection("users")
      .updateOne({ handle }, { $pull: { readingList: _id } });
    // remove the news object from the news collection
    const removedNews = await db.collection("news").deleteOne({ _id });
    res.status(200).json({
      status: 200,
      data: removedNews,
      message: "Article removed from reading list.",
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

//***************************
// GET all reading list news articles
//***************************
const getRL = async (req, res) => {
  //get use's email from session
  const email = req.session.email;
  //declaring a variable to use in my res status
  let displayedData = [];
  //getting the queries from the user
  let { start, limit } = req.query;
  //we change to Numbers because queries come in string form
  let startNum = Number(start);
  let limitNum = Number(limit);
  //this will be usefull for the calcs later
  let bothLimits = Number(start) + Number(limit);

  //declare client in mongo
  const client = new MongoClient(MONGO_URI, options);
  //try catch finally function
  try {
    //connect client
    await client.connect();
    //declare database in mongo
    const db = client.db("GoodMorningApp");
    //find all articles
    const news = await db
      .collection("news")
      .find({ email })
      .sort({ published_date: -1 })
      .toArray();
    // validations and user control.
    //I can use below if I don't want pagination
    // news.length > 0
    //   ? res.status(200).json({ status: 200, data: news })
    //   : res
    //       .status(404)
    //       .json({ status: 404, message: "Reading list is empty." });

    //   // validations and user control
    // everything below is for pagination
    if (news.length === 0) {
      return res.status(404).json({
        status: 404,
        data: displayedData,
        message: "Reading list is empty",
      });
    }
    if (!limit && !start) {
      displayedData = news;
    } else if (!limit) {
      displayedData = news.slice(startNum, startNum + 2);
    } else if (!start) {
      displayedData = news.slice(0, limitNum);
    } else if (startNum + limitNum > news.length) {
      displayedData = news.slice(startNum, news.length + 1);
    } else if (startNum > news.length) {
      return (displayedData = []);
    } else {
      displayedData = news.slice(startNum, startNum + limitNum);
    }
    res.status(200).json({
      status: 200,
      length: displayedData.length,
      message: "Success",
      data: displayedData,
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
  getHoroscope,
  getWeather,
  getNews,
  addToFav,
  removeFav,
  getFav,
  getRL,
  removeArticleFromRL,
  addToReading,
};
