const express = require("express");

const router = express.Router();

const { authRequired } = require("../helpers/authentication");

const {
  getHoroscope,
  getWeather,
  getNews,
  addToFav,
  removeFav,
  getFav,
  getRL,
  removeArticleFromRL,
  addToReading,
} = require("../handlerAPI");

/////////////////////////////////////////////////////////////////////////////
// gets horoscopes
// router.post("/api/horoscope", authRequired, getHoroscope);
router.post("/api/horoscope", getHoroscope);

// gets weather forcast
// router.post("/api/weather", authRequired, getWeather);
router.post("/api/weather", getWeather);

// gets top news
// router.post("/api/news", authRequired, getNews);
router.post("/api/news", getNews);

// add horoscope to favorite
router.post("/api/favorite", authRequired, addToFav);

// remove horoscope from favorite
router.delete("/api/favorite/:horoId", authRequired, removeFav);

// get all favorites
router.get("/api/favorite", getFav);

// add article to reading list
router.post("/api/reading-list", authRequired, addToReading);

// remove article from reading list
router.delete("/api/reading-list/:_id", authRequired, removeArticleFromRL);

// get all articles in reading list
router.get("/api/reading-list", getRL);

module.exports = router;
/////////////////////////////////////////////////////////////////////////////
