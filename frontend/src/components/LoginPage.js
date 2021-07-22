import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { SIGNUP_URL, SIGNIN_URL } from "../constants/constants";

const LoginPage = () => {
  const [loginMode, setLoginMode] = useState(0); // 0 - Sign-In page   1 - Sign-Up page
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  let history = useHistory();

  const toggleLoginMode = () => {
    loginMode ? setLoginMode(0) : setLoginMode(1);
  };

  const submitForm = (event) => {
    event.preventDefault();

    console.log("Submit");

    //perform signin/signup
    axios
      .post(loginMode ? SIGNUP_URL : SIGNIN_URL, {
        email: email,
        password: password,
      })
      .then((response) => {
        setErrors({});
        history.push({
          pathname: "/",
          state: {
            token: response.data.token,
          },
        });
      })
      .catch((err) => {
        setErrors({ ...err.response.data });
      });
  };

  return (
    <div className="login-box">
      <h1 className="login-heading">Project IAS</h1>
      <div className="login-toggle">
        <div className="login-toggle-text">
          {loginMode ? "Already have an account ?" : "Not registered yet?"}
        </div>
        <div className="login-toggle-link" onClick={toggleLoginMode}>
          {loginMode ? "Sign In" : "Sign Up"}
        </div>
      </div>
      <div className="input-contain">
        <input
          className="login-input"
          type="email"
          id="femail"
          name="femail"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <label class="placeholder-label" for="femail" id="placeholder-femail">
          <div class="placeholder-text">Email address</div>
        </label>
        <div className="error-div">{errors.email}</div>
      </div>
      <div className="input-contain">
        <input
          className="login-input"
          type="password"
          id="fpass"
          name="fpass"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
        <label class="placeholder-label" for="fpass" id="placeholder-fpass">
          <div class="placeholder-text">Password</div>
        </label>
        <div className="error-div">{errors.password}</div>
      </div>
      <div className="input-contain">
        <button
          className="login-submit"
          type="submit"
          onClick={(event) => submitForm(event)}
        >
          {loginMode ? "Sign Up" : "Sign In"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
