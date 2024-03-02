import { useContext } from "react";
import { AppState } from "../../App";
// import { Link } from "react-router-dom";

function Questions() {
  const { user } = useContext(AppState);

  // Mock data for questions (replace with data from the database)
  //   const questions = [
  //     { id: 1, text: "Question 1" },
  //     { id: 2, text: "Question 2" },
  //     { id: 3, text: "Question 3" },
  //   ];

  return (
    <div>
      <div className='questions_top_container'>
        <button>Ask Question </button>
      </div>
      <div>{user && <h2>Welcome: {user.username}</h2>}</div>

      <h4>Questions</h4>

      {/* Map over the questions array and render each question title*/}
      {/* {questions.map((question) => (
        <div key={question.id} className='Single_questions_container'> */}
      {/* <div> */}
      {/* user name and image */}
      {/* </div> */}
      {/* <div> */}
      {/* Single question */}
      {/* <p>{question.tille}</p>
          </div>
          <div> */}
      {/* Link to the  questionAnswers page to show details and post answer */}
      {/* <Link to={`/question-answers/${question.id}`}>View Question and answers if any</Link>
          </div>
        </div>
      ))} */}
    </div>
  );
}

export default Questions;
