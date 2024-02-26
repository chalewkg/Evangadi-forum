const express = require("express");
require("dotenv").config();
const app = express();
const port = 5500;
//Jason middleware to extract json data
app.use(express.json());

// db connection
const dbConnection = require("./db/dbConfig");

//user routers midleware file
const userRoutes = require("./routes/userRoute");

//questtions routs middleware file
const questionsRouts = require("./routes/questionRoute");

// authuntication middlware
const authMiddleware = require("./middleware/authmiddleware");

//users middleware
app.use("/api/users", userRoutes);

//questions middleware
app.use("/api/questions", authMiddleware, questionsRouts);

//answers middleware

//db conectin and server set up
async function start() {
  try {
    const result = await dbConnection.execute('select "test"');
    app.listen(port);
    console.log("database connection established");
    console.log(`listening on ${port}`);
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}

start();

// listing port
