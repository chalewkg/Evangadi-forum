import { Link } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AppState } from "../../App";
import classes from "./questionAnswers.module.css";

function QuestionAnswers() {
  const { user } = useContext(AppState);
  const { questionId } = useParams();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [newAnswerText, setNewAnswerText] = useState("");

  // console.log(questionId);

  useEffect(() => {
    const fetchQuestionAndAnswers = async () => {
      try {
        const response = await axios.get(`/questions/${questionId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setQuestion(response.data.question);
        setAnswers(response.data.answers);
        // console.log(question);
        // console.log(answers);
      } catch (error) {
        console.error("Error fetching question and answers:", error);
      }
    };
    fetchQuestionAndAnswers();
  }, [questionId]);

  const postAnswer = async () => {
    // console.log("test post in ");
    try {
      const response = await axios.post(
        "/answers/post-answer",
        //http://localhost:5500/api
        {
          questionid: questionId,
          userid: user.userid,
          answer: newAnswerText,
        },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setAnswers([...answers, response.data.answers]);
      setNewAnswerText(""); // Clear the new answer text input
      console.log("Answer posted successfully:", response.data);
    } catch (error) {
      console.error("Error posting answer:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newAnswerText.trim() === "") {
      alert("Please add an answer before submitting.");
      return;
    }
    postAnswer();
  };

  // console.log(questionId);
  // console.log(userid);
  // console.log(newAnswerText);

  return (
    <div className={classes.outer_container}>
      <div>
        <h4>Question</h4>
        <div className={classes.inner_container}>
          {question && (
            <div className={classes.questionAnswers_container}>
              <div className={classes.question_user_container}>
                <div>
                  <AccountCircleIcon color='primary' fontSize='large' />
                  <br />
                  <span>{question?.username} </span>
                </div>
                <div>
                  <p>{question?.title}</p>
                  <small>{question.description}</small>
                </div>
              </div>

              <div className={classes.answer_container}>
                <div className={classes.answer_inner_container}>
                  <h4>Answer The Top Questions </h4>
                  <Link className={classes.noUnderline} to={"/questions"}>
                    <div>
                      <small>Go to All Quesions page</small>
                    </div>
                    <br />
                  </Link>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <textarea
                        placeholder='Your Answer'
                        rows='10'
                        cols='80'
                        value={newAnswerText}
                        onChange={(e) => setNewAnswerText(e.target.value)}
                      />
                    </div>
                    <br />
                    <div>
                      <button className={classes.button}>
                        Post Your Answer
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <hr />
              <h4>Answer From the Community</h4>
              <hr />
              <h3>Answers</h3>

              <ul>
                {answers.map((answer) => (
                  <li key={answer?.answerid}>
                    <div className={classes.answer_user_container}>
                      <div>
                        <AccountCircleIcon color='primary' fontSize='large' />
                        <br />
                        <span>{answer?.username} </span>
                      </div>
                      <div>{answer?.answer}</div>
                    </div>
                    <br />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionAnswers;
