// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.scss";
import Header from "./components/Header/Header";
import Main from "./components/Main";
import Login from "./components/Login/Login";
import CategoriesNavigation from "./components/CategoriesNavigation/CategoriesNavigation";
import BannerCarousel from "./components/BannerCarousel/BannerCarousel";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Main/>
        <CategoriesNavigation />
        <BannerCarousel />
        <Routes>
          <Route path="/login" element={<Login />} />
           {/* <Route path="/" element={<Main />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
