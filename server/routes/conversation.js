const express = require("express");

const router = express.Router();

const { authRequired } = require("../helpers/authentication");

const {
  addConversation,
  getConversation,
  getCouplesConversation,
} = require("../handlerConversation");

/////////////////////////////////////////////////////////////////////////////
// post a new conversation in db
router.post("/api/conversation", addConversation);

// gets user's conversations
router.get("/api/conversation/:userId", getConversation);

// gets a specific conversation
router.get("/api/conversation/:userId/:friendId", getCouplesConversation);

module.exports = router;
/////////////////////////////////////////////////////////////////////////////
