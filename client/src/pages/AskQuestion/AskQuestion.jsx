import React from "react";
import { Link } from "react-router-dom";

function AskQuestion() {
  return (
    <>
      {/* List of instructions a user must follow to write a good question. */}
      <div>
        <ul>
          <li>Summarize your problem in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li> Describe what you tried and what you expected to happen.</li>
          <li> Review your question and post it to the site.</li>
        </ul>
      </div>
      <div>
        <h4>Ask a public question</h4>
        <Link to={"/questions"}>Go to All Quesions page </Link>
      </div>

      <div>
        <form>
          <input type='text' placeholder='tilte'></input>

          <textarea placeholder='Your Answer' rows='8' cols='80'></textarea>
          <button type='submit'> Post Your Questions</button>
        </form>
      </div>
    </>
  );
}

export default AskQuestion;
