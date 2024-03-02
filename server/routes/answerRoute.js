const express = require("express");
const router = express.Router();
const postAnswer = require("../controller/answerController");
const authMiddleware = require("../middleware/authmiddleware");

// Define route to post an answer
router.post("/post-answer", authMiddleware, postAnswer);

module.exports = router;
