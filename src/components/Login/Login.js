// src/components/Login.js
import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [userExists, setUserExists] = useState(null);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const checkUserExists = () => {
    const existingUsers = ["user1", "user2", "user3"];
    setUserExists(existingUsers.includes(username));
  };

  const handleContinue = () => {
    checkUserExists();
  };

  const handleLogin = () => {
    console.log("Logging in with", { username, password });
  };

  const handleSetPassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Setting new password for", { username, newPassword });
  };

  return (
    <div className="login-container">
      <h1>Login Page</h1>
      <input
        type="text"
        placeholder="Username/Email/Mobile Number"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleContinue}>Continue</button>

      {userExists === true && (
        <div className="w-100">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}

      {userExists === false && (
        <div className="w-100">
          <input
            type="password"
            placeholder="Enter Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handleSetPassword}>Set Password</button>
        </div>
      )}
    </div>
  );
};

export default Login;
