import { useRef } from "react";
import axios from "../../axiosConfig";
import React, { Link, useNavigate } from "react-router-dom";
import classes from "./login.module.css";

function Login() {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (!emailValue || !passValue) {
      alert("please provide all required information");
      return;
    }

    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passValue,
      });
      alert("login successfull.");
      localStorage.setItem("token", data.token);
      navigate("/questions");
      console.log(data);

      //* remove befoer deployment
      // console.log(emailDom.current.value);
      // console.log(passwordDom.current.value);
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error.response.data);
    }
  }

  return (
    <section className={classes.login_container} onSubmit={handleSubmit}>
      <div>
        <form>
          <div>
            <input ref={emailDom} type='email' placeholder='Email address' />
          </div>
          <br />
          <div>
            <input ref={passwordDom} type='password' placeholder='Password' />
          </div>
          <br />
          <button type='submit'>Login</button>
        </form>
        <p>
          Don’t have an account?{" "}
          <span>
            <Link to={"/register"}>Create a new account</Link>
          </span>
        </p>
      </div>

      <div className={classes.about_container}>
        <p>About</p>
        <h1>Evangadi Networks</h1>
        <p>
          No matter what stage of life you are in, whether you’re just starting
          elementary school or being promoted to CEO of a Fortune 500 company,
          you have much to offer to those who are trying to follow in your
          footsteps.
        </p>
        <p>
          Wheather you are willing to share your knowledge or you are just
          looking to meet mentors of your own, please start by joining the
          network here.
        </p>
      </div>
    </section>
  );
}

export default Login;
