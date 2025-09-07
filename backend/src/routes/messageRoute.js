const express = require("express");
const {
  sendMessage,
  getMessage,
} = require("../controllers/messageController.js");
const router = express.Router();
const { isAuthenticated } = require("../middleware/isAuthenticated.js");

// Here we define the route for sending messages
// Who to send?/ we get that by getting the id from params
router.route("/send/:id").post(isAuthenticated, sendMessage);
router.route("/:id").post(isAuthenticated, getMessage);
module.exports = router;
