import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AppState } from "../../App";
import axios from "../../axiosConfig";
import classes from "./askQuestion.module.css";

function AskQuestion() {
  const { user } = useContext(AppState);
  const [newQuestion, setNewQuestion] = useState("");
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");

  const postQuestion = async () => {
    try {
      const response = await axios.post(
        "questions/ask-questions",
        //http://localhost:5500/api/questions/ask-questions
        {
          userid: user.userid,
          description: newQuestion,
          title: title,
          tag: tag,
        },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Question posted successfully:", response.data);
      // Reset state after successful posting
      setNewQuestion(""); // Clear the new question text input
      setTitle("");
      setTag("");
    } catch (error) {
      console.error("Error posting question:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newQuestion.trim() === "") {
      alert("Please add an question before submitting.");
      return;
    }

    postQuestion();
  };
  // add a fucntion that fetch the singel question and answers from the both questin and answere table
  return (
    <>
      {/* List of instructions a user must follow to write a good question. */}
      <div className={classes.askQuestion_container}>
        <div>
          <div className={classes.steps_container}>
            <div>
              <ul>
                <li>Summarize your problem in a one-line title.</li>
                <li>Describe your problem in more detail.</li>
                <li>
                  {" "}
                  Describe what you tried and what you expected to happen.
                </li>
                <li> Review your question and post it to the site.</li>
              </ul>
            </div>
          </div>
          <div className={classes.ask_container}>
            <div>
              <h4>Ask a public question</h4>
              <Link className={classes.noUnderline} to={"/questions"}>
                <small> Go to All Quesions page</small>
              </Link>
            </div>
          </div>
          <br />
          <div className={classes.form_container}>
            <div>
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    type='text'
                    placeholder='tilte'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <br />
                <div>
                  <textarea
                    placeholder='Your Question'
                    rows='8'
                    cols='80'
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                  />
                </div>
                <br />
                <div>
                  <input
                    type='text'
                    placeholder='tag'
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                  />
                </div>
                <br />
                <div>
                  <button className={classes.button}>
                    Post Your Questions
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AskQuestion;
