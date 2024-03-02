const dbConnection = require("../db/dbConfig");

async function askQuestion(req, res) {
  const { title, description, tag } = req.body;
  const userid = req.user.userid; // Extract userid from authenticated user

  try {
    // Add question to the database with userid
    await dbConnection.query(
      "INSERT INTO questions(title, description, tag, userid) VALUES (?,?,?,?)",
      [title, description, tag, userid]
    );
    console.log(userid);
    return res.status(201).json({ msg: "Question successfully posted" });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ msg: "Something went wrong, try again later!" });
  }
}

// Get all questions
async function allQuestions(req, res) {
  try {
    // Retrieve all questions from the database
    const questions = await dbConnection.query(
      "SELECT * FROM questions ORDER BY created_at DESC"
    );

    console.log(questions);
    return res.status(200).json(questions);
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ msg: "Something went wrong, try again later!" });
  }
}

// Controller function to fetch a single question with its details and answers
async function questionDetails(req, res) {
  try {
    const { questionId } = req.params;

    // Fetch the question details
    const [question] = await dbConnection.query(
      "SELECT * FROM questions WHERE questionid = ?",
      [questionId]
    );

    if (question.length <= 0) {
      return res.status(404).json({ message: "Question not found" });
    }

    console.log(question);
    // Fetch answers associated with the question
    // Fetch all answers associated with the question
    const [answers] = await dbConnection.query(
      "SELECT * FROM answers WHERE questionid = ?",
      [questionId]
    );

    // Combine question and answers data
    const questionWithAnswers = {
      ...question,
      answers: answers,
    };

    console.log(questionWithAnswers);
    // Generate timestamp for when the answer was posted
    const timestamp = new Date().toISOString();
    console.log(timestamp);
    // Send the question with its details and answers in the response
    return res.status(200).json(questionWithAnswers);
  } catch (error) {
    console.error("Error fetching question with answers:", error);
    return res.status(500).json({
      message: "Failed to fetch question with answers. Please try again later.",
    });
  }
}

module.exports = { askQuestion, allQuestions, questionDetails };
