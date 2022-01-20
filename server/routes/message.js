const express = require("express");

const router = express.Router();

const { authRequired } = require("../helpers/authentication");

const { addMessage, getMessages } = require("../handlerMessage");

/////////////////////////////////////////////////////////////////////////////
// adds a new message in db
router.post("/api/messages", authRequired, addMessage);

// gets user messages from db
router.get("/api/messages/:conversationId", authRequired, getMessages);

module.exports = router;
/////////////////////////////////////////////////////////////////////////////
