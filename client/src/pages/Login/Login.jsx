// import { useRef } from "react";
// import axios from "../../axiosConfig";
// import React, { Link, useNavigate } from "react-router-dom";
// import classes from "./login.module.css";

// *import useStyles from "../../Styles/styles";

// function Login() {
//   const navigate = useNavigate();
//   const emailDom = useRef();
//   const passwordDom = useRef();

//   async function handleSubmit(e) {
//     e.preventDefault();

//     const emailValue = emailDom.current.value;
//     const passValue = passwordDom.current.value;

//     if (!emailValue || !passValue) {
//       alert("please provide all required information");
//       return;
//     }

//     try {
//       const { data } = await axios.post("/users/login", {
//         email: emailValue,
//         password: passValue,
//       });
//       alert("login successfull.");
//       localStorage.setItem("token", data.token);
//       navigate("/questions");
//       console.log(data);

//* remove befoer deployment
//* console.log(emailDom.current.value);
// *console.log(passwordDom.current.value);
//   } catch (error) {
//     alert(error?.response?.data?.msg);
//     console.log(error.response.data);
//   }
// }

// return (
//   <section className={classes.login_container} onSubmit={handleSubmit}>
//     <div className={classes.login_inner_container}>
//       <div className={classes.login_form}>
//         <h5>Login to your account</h5>
//         <p>
//           Don’t have an account?
//           <span>
//             <Link to={"/register"}>Create a new account</Link>
//           </span>
//         </p>
//         <form>
//           <div>
//             <input
//               ref={emailDom}
//               type='email'
//               placeholder='Email address'
// *className={classes.input}
//   />
// </div>
// <br />
// <div>
//   <input
//     ref={passwordDom}
//     type='password'
//     placeholder='Password'
// *className={classes.input}
//                 autoComplete='off'
//               />
//             </div>
//             <br />
//             <button type='submit'>Login</button>
//           </form>
//         </div>
//         <div className={classes.about_container}>
//           <p>About</p>
//           <h1>Evangadi Networks</h1>
//           <p>
//             No matter what stage of life you are in, whether you’re just
//             starting elementary school or being promoted to CEO of a Fortune 500
//             company, you have much to offer to those who are trying to follow in
//             your footsteps.
//           </p>
//           <p>
//             Wheather you are willing to share your knowledge or you are just
//             looking to meet mentors of your own, please start by joining the
//             network here.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Login;

import { useRef, useEffect } from "react";
import axios from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import classes from "./login.module.css";

function Login() {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();

  useEffect(() => {
    // Clear input fields when the component mounts
    emailDom.current.value = "";
    passwordDom.current.value = "";
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (!emailValue || !passValue) {
      alert("Please provide all required information");
      return;
    }

    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passValue,
      });
      alert("Login successful.");
      localStorage.setItem("token", data.token);
      navigate("/questions");
    } catch (error) {
      alert(error?.response?.data?.msg || "An error occurred");
      console.log(error.response.data);
    }
  }

  return (
    <section className={classes.login_container}>
      <div className={classes.login_inner_container}>
        <div className={classes.login_form}>
          <h5>Login to your account</h5>
          <p>
            Don’t have an account?{" "}
            <Link to={"/register"}>Create a new account</Link>
          </p>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                ref={emailDom}
                type='email'
                placeholder='Email address'
                autoComplete='off'
              />
            </div>
            <br />
            <div>
              <input
                ref={passwordDom}
                type='password'
                placeholder='Password'
                autoComplete='off'
              />
            </div>
            <br />
            <button type='submit'>Login</button>
          </form>
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
            Whether you are willing to share your knowledge or you are just
            looking to meet mentors of your own, please start by joining the
            network here.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
