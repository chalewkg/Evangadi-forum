import React from "react";
import classes from "./header.module.css";
import logo from "../../Asset/Image/10001.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <section className={classes.header}>
      <div className={classes.logo}>
        <img src={logo} />
      </div>

      <div className={classes.right_contianer}>
        <ul>
          <li>
            <Link to={"/questions"}>Home</Link>
          </li>

          <li>
            <Link to={"/how"}>How it Works</Link>
          </li>

          <li>
            <Link to={"/login"}>
              <button> SIGN IN</button>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Header;
