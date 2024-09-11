// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import Main from "./components/Main";
import Login from "./components/Login/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Main/>
        <Routes>
          <Route path="/login" element={<Login />} />
           {/* <Route path="/" element={<Main />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
