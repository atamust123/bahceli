import React, { useState } from "react";
import ReactDOM from "react-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RenderSignInForm from './components/SignInForm';
import RenderSignUpForm from './components/SignUpForm.jsx';
import "./Apps/Login.css";

export const App = () => {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [loginStatus, setLoginStatus] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);

  const handleSignInClick = () => {
    setIsSignIn(true);
  };
  const handleSignUpClick = () => {
    setIsSignIn(false);
  };

//   if (Object.keys(errorMessages).length === 0) {
//     setIsSubmitted(true);
//   }

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    errorMessages && errorMessages.name === name &&(
      <div className="error">{errorMessages.message}</div>
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
        {loginStatus ? <div>User is successfully logged in</div> : (isSignIn ? <RenderSignInForm loginStatus={loginStatus} /> : <RenderSignUpForm/>)}
      </div>
    </div>
  );
};
