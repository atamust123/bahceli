import React from "react";
import Navigation from './Apps/Navigation';
import MainPage from './Apps/MainPage';
import Login from './Apps/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigation />}/>
          <Route path="/Login" element={<Login />} />
          <Route path="/MainPage" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
