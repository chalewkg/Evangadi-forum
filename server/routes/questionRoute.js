const express = require("express");
const router = express.Router();

// authuntication middlware
// const authMiddleware = require("../middleware/authmiddleware");

const {
  askQuestion,
  allQuestions,
  questionDetails,
} = require("../controller/questionController");

//API endpoint to post quesations
router.post("/ask-questions", askQuestion);
//localhost:5500/api/questions/ask-questions

//API endpoint to fetch all quesations
router.get("/all-questions", allQuestions);

// API endpoint to fetch a single question with its details and answers
router.get("/:questionId", questionDetails);

//localhost:5500/api/questions/:questionId
module.exports = router;
