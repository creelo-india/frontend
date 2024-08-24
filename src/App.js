// src/App.js
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";


const App = () => {
  const loginState=useSelector(state=>state?.authReducer)

  
 
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
