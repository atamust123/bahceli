import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import axios from "axios";

const RenderSignInForm = ({ loginStatus}) => {
  const errors = {
    uname: "invalid username",
    pass: "wrong password",
    uemail: "wrong email"
  };
  const [userLoginStatus, setLoginStatus] = useState(loginStatus);
  const [errorMessages, setErrorMessages] = useState({});
  const renderErrorMessage = (name) =>
    errorMessages && errorMessages.name === name && (
      <div className="error">{errorMessages.message}</div>
    );
    const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const unameOrEmail = event.target.unameOrEmail.value;
    const pass = event.target.pass.value;

    try {
      const response = await axios.post("http://localhost:5000/login", {
        unameOrEmail,
        pass
      });

      // Authentication successful, handle the response
      console.log(response.data);
      setLoginStatus(true);
      // Continue with any necessary logic
    } catch (error) {
      // Authentication failed, handle the error
      if (error.response && error.response.status === 401) {
        setErrorMessages({ name: "pass", message: errors.pass });
        setLoginStatus(false);
      } else {
        console.log("Error occurred during authentication");
      }
    }
  };

  return (
  <>
     {!userLoginStatus
     ?
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Username or Email</label>
            <input type="text" name="unameOrEmail" required />
            {renderErrorMessage("unameOrEmail")}
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
        :
      navigate('/MainPage')
      }
</>
  );
};

export default RenderSignInForm;
