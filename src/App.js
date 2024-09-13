import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Header from "./components/Header/Header";
import Main from "./components/Main";
import Login from "./components/Login/Login";
import CategoriesNavigation from "./components/CategoriesNavigation/CategoriesNavigation";
import ProductListingPage from "./components/ProductListingPage/ProductListingPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <CategoriesNavigation />
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
