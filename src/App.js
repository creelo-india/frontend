import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header/Header";
import Main from "./components/Main";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import CategoriesNavigation from "./components/CategoriesNavigation/CategoriesNavigation";
import ProductListingPage from "./components/ProductListingPage/ProductListingPage";
import ProductDetailPage from "./components/ProductDetailPage/ProductDetailPage";
import CheckoutPage from "./components/CheckoutPage/CheckoutPage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.scss";

function App() {
  return (
    <Router>
      <CartProvider>
      <div className="App">
        <Header />
        <CategoriesNavigation />

        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product-search" element={<ProductListingPage />} />
            <Route path="/category/:slug" element={<ProductListingPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </main>
      </div>
      </CartProvider>
    </Router>
  );
}

export default App;
