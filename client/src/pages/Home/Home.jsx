import { useContext } from "react";
import { AppState } from "../../App";
import { Link } from "react-router-dom";

function Home() {
  const { user } = useContext(AppState);

  return (
    <div>
      {/* <h2>Welcome: {user.username}</h2> */}
      {user && <h2>Welcome: {user.username}</h2>}

      <div>
        <ol>
          <li>
            <span></span>
            <Link to={"/single-question"}>Question: </Link>
          </li>
          <li>
            <span></span>
            <Link to={"/single-question"}>Question: </Link>
          </li>
          <li>
            <span></span>
            <Link to={"/single-question"}>Question: </Link>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default Home;
