import React from "react";
import { Link } from "react-router-dom";

function QuestionAnswers() {
  return (
    <div>
      <div>
        {/* Header  */}
        <h4>Question</h4>
        {/* the question title  */}
        <p>title </p>
        {/* Question detail */}
        <p>question details</p>
      </div>
      <hr />
      <h4>Answer From the Community</h4>
      <hr />
      <div>
        {/* user info - image and user name */}
        <div>
          <img href='#' alt='user photo' />
          <p>user name </p>
        </div>
        {/* Answere by other user gose here  */}
        <div>Answere</div>

        <div>
          <h4>Answer The Top Questions </h4>
          <Link to={"/questions"}>Go to All Quesions page </Link>
        </div>

        <div>
          <textarea placeholder='Your Answer' rows='8' cols='80'></textarea>
        </div>
      </div>
    </div>
  );
}

export default QuestionAnswers;
