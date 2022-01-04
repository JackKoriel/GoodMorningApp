const express = require("express");

const router = express.Router();

const { authRequired } = require("../helpers/authentication");

const { addMessage, getMessages } = require("../handlerMessage");

/////////////////////////////////////////////////////////////////////////////
// adds a new message in db
router.post("/api/messages", addMessage);

// gets user messages from db
router.get("/api/messages/:conversationId", getMessages);

module.exports = router;
/////////////////////////////////////////////////////////////////////////////
