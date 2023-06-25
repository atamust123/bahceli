import React, { useState } from "react";
import axios from "axios";


const RenderSignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});


  const renderErrorMessage = (name) =>
    errorMessages && errorMessages.name === name && (
      <div className="error">{errorMessages.message}</div>
    );

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form data
    if (!username || !email || !password) {
      setErrorMessages({ name: "general", message: "Please fill in all the fields" });
      return;
    }

    try {
      axios.post('http://localhost:5000/register', {username, email, password})
        .then(response => {
          // Registration successful, handle the response
          console.log(response.data);
          // Continue with any necessary logic
        })
        .catch(error => {
          // Registration failed, handle the error
          if (error.response && error.response.status === 409) {
            console.log('User already exists');
          } else {
            console.log('Error occurred during registration');
          }
        });
      // Clear the form
      setUsername("");
      setEmail("");
      setPassword("");
      setErrorMessages({});
    } catch (error) {
      // Handle any errors that occurred during the API request
      console.error(error);
      setErrorMessages({ name: "general", message: "An error occurred. Please try again later." });
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username</label>
          <input
            type="text"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Email</label>
          <input
            type="text"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {renderErrorMessage("uemail")}
        </div>
        <div className="input-container">
          <label>Password</label>
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" value="Submit" />
        </div>
        {renderErrorMessage("general")}
      </form>
    </div>
  );
};

export default RenderSignUpForm;
