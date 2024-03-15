const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/userRoute");
const questionsRoutes = require("./routes/questionRoute");
const answersRoutes = require("./routes/answerRoute");
const authMiddleware = require("./middleware/authmiddleware");

// JSON middleware to extract JSON data
app.use(express.json());

// CORS middleware
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/questions", authMiddleware, questionsRoutes);
app.use("/api/answers", authMiddleware, answersRoutes);

// Database connection and server setup
const dbConnection = require("./db/dbConfig");
const port = process.env.PORT || 5500;

async function start() {
  try {
    await dbConnection.execute('SELECT "test"');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    console.log("Database connection established");
  } catch (error) {
    console.log(error.message);
  }
}

start();
