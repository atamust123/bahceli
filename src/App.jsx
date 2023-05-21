import React, { useState } from "react";
import ReactDOM from "react-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import "./Apps/Login.css";

export const App = () => {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);

const handleSignInClick = () => {
  setIsSignIn(true);};

const handleSignUpClick = () => {
  setIsSignIn(false);
};
  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1",
      email: "aayildiz@email.com"
    },
    {
      username: "user2",
      password: "pass2",
      email: "ntan@email.com"

    }
  ];
  const errors = {
    uname: "invalid username",
    pass: "wrong password",
    uemail: "wrong email"
  };

const handleSubmit = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const unameOrEmail = formData.get("unameOrEmail");
  const pass = formData.get("pass");

  const userData = database.find(
    (user) => user.username === unameOrEmail || user.email === unameOrEmail
  );

  if (userData) {
    if (userData.password !== pass) {
      setErrorMessages({ name: "pass", message: errors.pass });
    } else {
      setErrorMessages({});
    }
  } else {
    if (unameOrEmail.includes("@")) {
      setErrorMessages({ name: "unameOrEmail", message: errors.email });
    } else {
      setErrorMessages({ name: "unameOrEmail", message: errors.uname });
    }
  }
  // Clear the form fields after submission
  event.target.reset();

  if (Object.keys(errorMessages).length === 0) {
    setIsSubmitted(true);
  }
};
  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderSignInForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username or Email</label>
          <input type="text" name="unameOrEmail" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );

  const renderSignUpForm = (
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Username </label>
            <input type="text" name="uname" required />
            {renderErrorMessage("uname")}
          </div>
          <div className="input-container">
              <label>E-mail </label>
              <input type="text" name="uemail" required />
          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" name="pass" required />
            {renderErrorMessage("pass")}
          </div>
          <div className="button-container">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );

  return (
    <div className="app">
      <div className="login-form" >
       <Container>
            <Row className="title-row">
              <Col
                className={`title ${isSignIn ? "active" : ""}`}
                onClick={handleSignInClick}
              >
                Sign In
              </Col>
              <Col
                className={`title ${!isSignIn ? "active" : ""}`}
                onClick={handleSignUpClick}
              >
                Sign Up
              </Col>
            </Row>

       </Container>
        {isSubmitted ? <div>User is successfully logged in</div> : (isSignIn ? renderSignInForm : renderSignUpForm)}
      </div>
    </div>
  );
};
