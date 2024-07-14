import React, { useEffect } from "react";
import "./styles/Auth.css";

const Auth = () => {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");

    if (token) {
      localStorage.setItem("token", token);
      window.location.href = "/dashboard";
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/logout`;
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <a
        className="auth-button"
        href={`${process.env.REACT_APP_BACKEND_BASE_URL}/auth/google`}
      >
        Login with Google
      </a>
      <button className="auth-button logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Auth;
