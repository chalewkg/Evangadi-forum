const dbConnection = require("../db/dbConfig");

async function postAnswer(req, res) {
  const { answer } = req.body;
  const userid = req.user.userid; // Extract userid from authenticated user
  const questionid = req.body.questionid; // Extract questionid from the request body //* i doubt this - how the req.body get the question id

  try {
    // Add answer to the database with userid and questionid
    await dbConnection.query(
      "INSERT INTO answers (answer, userid, questionid) VALUES (?, ?, ?)",
      [answer, userid, questionid]
    );

    return res.status(201).json({ msg: "Answer successfully posted" });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ msg: "Something went wrong, try again later!" });
  }
}

module.exports = postAnswer;
