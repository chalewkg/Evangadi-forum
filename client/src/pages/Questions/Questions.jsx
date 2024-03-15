import { useContext, useState, useEffect } from "react";
import { AppState } from "../../App";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../Api/axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import classes from "./questions.module.css";
// import { Container } from "@mui/material";

function Questions() {
  const { user, token } = useContext(AppState);
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await axiosInstance.get("/questions/all-questions", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the authentication token in the request headers
          },
        });
        console.log(token);
        console.log(response);
        setQuestions(response.data[0]);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    // console.log(token);
    // console.log(user);
    console.log(questions);
    // Fetch questions only if the user is logged in and has a token
    if (user && token) {
      getQuestions();
    }
  }, []); // Trigger the effect when the user object changes

  return (
    <section>
      <div className={classes.outer_container}>
        <div className={classes.questions_top_container}>
          <div>
            <Link to={"/ask-questions"}>
              <button className={classes.button}>Ask Question </button>
            </Link>
          </div>
          <div>{user && <h2>Welcome: {user.username}</h2>}</div>
        </div>

        <h4>Questions</h4>
        {/* Map over the questions array and render each question title and description*/}
        {questions.map((question) => (
          <div key={question?.questionid}>
            <hr />
            <Link
              className={classes.noUnderline}
              to={`/question-answers/${question?.questionid}`}>
              <div className={classes.singelQ_container}>
                <div className={classes.question_container}>
                  <div>
                    <AccountCircleIcon color='primary' fontSize='large' />
                    <br />
                    <span>{question?.username} </span>
                  </div>
                  <div>
                    <p>{question?.title}</p>
                  </div>
                </div>
                <div>
                  <ChevronRightIcon />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Questions;
