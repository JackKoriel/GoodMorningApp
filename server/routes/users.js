const express = require("express");

const router = express.Router();

const { getUsers, getBacon } = require("../handlerUser");

/////////////////////////////////////////////////////////////////////////////
//get bacon for testing server:
router.get("/api/bacon", getBacon);

// gets all user from server
router.get("/api/users", getUsers);

module.exports = router;
/////////////////////////////////////////////////////////////////////////////
