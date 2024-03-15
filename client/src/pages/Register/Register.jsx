import { useRef } from "react";
import axios from "../../axiosConfig";
import React, { Link, useNavigate } from "react-router-dom";
import classes from "./register.module.css";

function Register() {
  const navigate = useNavigate();
  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    const usernameValue = usernameDom.current.value;
    const firsVlaue = firstnameDom.current.value;
    const lastValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (
      !usernameValue ||
      !firsVlaue ||
      !lastValue ||
      !emailValue ||
      !passValue
    ) {
      alert("please provide all required information");
      return;
    }

    try {
      await axios.post("/users/register", {
        username: usernameValue,
        firstname: firsVlaue,
        lastname: lastValue,
        email: emailValue,
        password: passValue,
      });
      alert("register successfull. please login");
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("Username or email already exists.");
      } else {
        alert("Something went wrong. Please try again later.");
        console.error(error);
      }
    }
  }

  return (
    <section className={classes.register_container} onSubmit={handleSubmit}>
      <div className={classes.register_inner_container}>
        <div className={classes.register_form}>
          <form onSubmit={handleSubmit}>
            <div>
              <input ref={usernameDom} type='text' placeholder='User Name' />
            </div>
            <br />
            <div className={classes.input_flex}>
              <div>
                <input
                  name='First name'
                  ref={firstnameDom}
                  type='text'
                  placeholder='First name '
                />
              </div>
              <div>
                <input
                  name='Last name'
                  ref={lastnameDom}
                  type='text'
                  placeholder='Last name '
                />
              </div>
            </div>

            <br />
            <div>
              <input ref={emailDom} type='email' placeholder='Email address' />
            </div>
            <br />
            <div>
              <input ref={passwordDom} type='password' placeholder='Password' />
            </div>
            <br />
            <button type='submit'>Agree and Join</button>
          </form>
          <br />
          <Link to={"/login"}>Already have an account?</Link>
        </div>
        <div className={classes.about_container}>
          <p>About</p>
          <h1>Evangadi Networks</h1>
          <p>
            No matter what stage of life you are in, whether you’re just
            starting elementary school or being promoted to CEO of a Fortune 500
            company, you have much to offer to those who are trying to follow in
            your footsteps.
          </p>
          <p>
            Wheather you are willing to share your knowledge or you are just
            looking to meet mentors of your own, please start by joining the
            network here.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Register;
