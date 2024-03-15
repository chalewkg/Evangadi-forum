// import React from "react";
// import { useContext } from "react";
// import classes from "./header.module.css";
// import logo from "../../Asset/Image/10001.png";
// import { Link } from "react-router-dom";
// import { AppState } from "../../App";
// import { useNavigate } from "react-router-dom";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// function Header() {
//   const { user, setUser, token, setToken } = useContext(AppState);
//   const navigate = useNavigate();

//   const handleButtonClick = () => {
//     if (user.username) {
//* User is logged in, so logout
//     handleLogout();
//   } else {
//     //* User is not logged in, so redirect to login page
//     navigate("/login");
//   }
// };

// const handleLogout = () => {
// *Clear user and token from the application state
// setUser({});
// setToken(" ");

// *Clear token from localStorage
// localStorage.removeItem("token");

// *Redirect to the login page
//   navigate("/login");
//   console.log(token);
//   console.log(user);
// };

//   return (
//     <section className={classes.header}>
//       <div className={classes.logo}>
//         <img src={logo} />
//       </div>

//       <div className={classes.right_contianer}>
//         <ul>
//           <li>
//             <Link to={"/questions"}>Home</Link>
//           </li>

//           <li>
//             <Link to={"/how"}>How it Works</Link>
//           </li>
//           <div>
//             <AccountCircleIcon color='primary' />
//             <span>{user.username} </span>
//           </div>

//           <li>
//             <button className={classes.button} onClick={handleButtonClick}>
//               {user.username ? "LOGOUT" : "LOGIN"}
//             </button>
//           </li>
//         </ul>
//       </div>
//     </section>
//   );
// }

// export default Header;

import React, { useContext } from "react";
import classes from "./header.module.css";
import logo from "../../Asset/Image/10001.png";
import { Link } from "react-router-dom";
import { AppState } from "../../App";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Header() {
  const { user, setUser, token, setToken } = useContext(AppState);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (user.username) {
      // User is logged in, so logout
      handleLogout();
    } else {
      // User is not logged in, so redirect to login page
      navigate("/login");
    }
  };

  const handleLogout = () => {
    // Clear user and token from the application state
    setUser({});
    setToken(null); // Set token to null instead of " " to properly clear it

    // Clear token from localStorage
    localStorage.removeItem("token");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <section className={classes.header}>
      <div className={classes.logo}>
        <img src={logo} alt='Logo' />
      </div>

      <div className={classes.right_contianer}>
        <ul>
          <li>
            <Link to={"/questions"}>Home</Link>
          </li>
          <li>
            <Link to={"/how"}>How it Works</Link>
          </li>
          {user.username ? ( // If user is logged in, display username and logout button
            <>
              {/* <li>
                <div className={classes.user_info}>
                  <AccountCircleIcon color='primary' />
                  <span>{user.username}</span>
                </div>
              </li> */}
              <li>
                <button className={classes.button} onClick={handleButtonClick}>
                  LOGOUT
                </button>
              </li>
            </>
          ) : (
            // If user is not logged in, display login button
            <li>
              <button className={classes.button} onClick={handleButtonClick}>
                LOGIN
              </button>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}

export default Header;
