const express = require("express");

const router = express.Router();

const { postImage } = require("../handleImage");

/////////////////////////////////////////////////////////////////////////////
//post image to mongo::: not being used at the moment
router.post("/api/image", postImage);

module.exports = router;
/////////////////////////////////////////////////////////////////////////////
