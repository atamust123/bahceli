import React, { useState } from "react";
import ReactDOM from "react-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RenderSignInForm from '../components/SignInForm';
import RenderSignUpForm from '../components/SignUpForm.jsx';
import "../Apps/Login.css";
import MultiActionAreaCard from '../components/infoCard';
import axios from "axios";


const MainPage = () => {

const response = axios.get("http://localhost:5000/places")
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

  return (
    <div className="app">
       <Container>
            ŞKFNŞSKFNWBKRNFWKRNE
            <MultiActionAreaCard />
       </Container>
    </div>
  );
};
export default MainPage;