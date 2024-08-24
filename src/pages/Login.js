// src/pages/Login.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "reactstrap";
import { loginStateAction } from "../redux/actions/loginState";

const Login = ({ setReset }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const {loginState}=useSelector(state=>state?.authReducer)


  const validateEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (validateEmail()) {
        setStep(step + 1);
      }
    } else if (step === 2) {
      if (validatePassword()) {
        dispatch(loginStateAction(true))
      }
    }
  };

  useEffect(()=>{
    if(loginState){
      navigate("/")
    }
   },[loginState])

  return (
    <div style={{ width: "20%" }}>
      <h2>Login</h2>
      <form>
        {step === 1 && (
          <>
            <div className="mb-3">
              <label>Email:</label>
              <Input
                id="exampleEmail"
                name="email"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
              />
              {emailError && <p style={{ color: "red" }}>{emailError}</p>}
            </div>
            <button onClick={handleForm}>Continue</button>
          </>
        )}
        {step === 2 && (
          <div>
            <label>Password:</label>
            <div className="mb-3">
              <Input
                id="examplePassword"
                name="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword}
              />
              {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
            </div>
            <button onClick={handleForm}>Sign In</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
