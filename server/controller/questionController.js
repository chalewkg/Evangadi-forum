const dbConnection = require("../db/dbConfig");
const { v4: uuidv4 } = require("uuid");
// Generate a random UUID

async function askQuestion(req, res) {
  const { title, description, tag } = req.body;
  const userid = req.user.userid; // Extract userid from authenticated user

  try {
    const id = uuidv4();
    console.log(id);
    // Add question to the database with userid
    await dbConnection.query(
      "INSERT INTO questions(id, title, description, tag, userid) VALUES (?,?,?,?,?)",
      [id, title, description, tag, userid]
    );
    // console.log(userid);
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
      "SELECT q.*, u.username FROM questions q INNER JOIN users u ON q.userid = u.userid ORDER BY q.created_at DESC;"
    );

    //console.log(questions);
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
    // const [question] = await dbConnection.query(
    //   "SELECT * FROM questions WHERE questionid = ?",
    //   [questionId]
    // );

    // if (question.length <= 0) {
    //   return res.status(404).json({ message: "Question not found" });
    // }

    //* compare
    // Fetch the question title and description
    const [questionData] = await dbConnection.query(
      "SELECT q.*, u.username FROM questions q INNER JOIN users u ON q.userid = u.userid WHERE q.questionid = ?",
      [questionId]
    );

    if (questionData.length === 0) {
      return res.status(404).json({ message: "Question not found" });
    }

    //*

    // console.log(question);
    // Fetch answers associated with the question
    // Fetch all answers associated with the question
    // const [answers] = await dbConnection.query(
    //   "SELECT * FROM answers WHERE questionid = ?",
    //   [questionId]
    // );

    //*

    // Fetch all answers along with usernames associated with the question
    const [answers] = await dbConnection.query(
      "SELECT a.*, u.username FROM answers a INNER JOIN users u ON a.userid = u.userid WHERE a.questionid = ?",
      [questionId]
    );

    const { title, description, questionid, tag, username } = questionData[0];

    // Construct the response object with question title, description, and answers with usernames
    const questionWithAnswers = {
      question: { title, description, questionid, tag, username },
      answers: answers.map((answer) => ({
        questionId: answer.questionid,
        answerId: answer.answerid,
        answer: answer.answer,
        userId: answer.userid,
        username: answer.username,
      })),
    };

    //*

    // // Combine question and answers data
    // const questionWithAnswers = {
    //   ...question,
    //   answers: answers,
    // };

    console.log(questionWithAnswers);
    // Generate timestamp for when the answer was posted
    // const timestamp = new Date().toISOString();
    // console.log(timestamp);
    // // Send the question with its details and answers in the response
    return res.status(200).json(questionWithAnswers);
  } catch (error) {
    console.error("Error fetching question with answers:", error);
    return res.status(500).json({
      message: "Failed to fetch question with answers. Please try again later.",
    });
  }
}

module.exports = { askQuestion, allQuestions, questionDetails };
