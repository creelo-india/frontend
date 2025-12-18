import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/MegaMenu/Header";
import Main from "./components/Main";
import Login from "./components/Login/Login";
import ProductListingPage from "./components/ProductListingPage/ProductListingPage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product-search" element={<ProductListingPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
