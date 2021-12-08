const express = require("express");

const router = express.Router();

const { postImage } = require("../handleImage");

/////////////////////////////////////////////////////////////////////////////
// post image cloudinary
// const parser = require("../middleware/cloudinary.config");

// router.post("/api/image", parser.single("image"), postImage);

router.post("/api/image", postImage);

module.exports = router;
/////////////////////////////////////////////////////////////////////////////
