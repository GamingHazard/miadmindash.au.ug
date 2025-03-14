import React, { useState } from "react";
import "./styles.css"; // Importing the CSS file

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // State to track login or signup form

  // Toggle between login and register forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Auth Page</title>

      {/* Toggle the active class based on state */}
      <div className={`wrapper ${isLogin ? "" : "active"}`}>
        <span className="bg-animate" />
        <span className="bg-animate2" />

        {/* Login Form */}
        <div className="form-box login">
          <h2 className="animation" style={{ "--i": 0, "--j": 21 }}>
            Login
          </h2>
          <form action="#">
            <div
              className="input-box animation"
              style={{ "--i": 1, "--j": 22 }}
            >
              <input type="text" id="Username_log" required />
              <label>Username</label>
            </div>
            <div
              className="input-box animation"
              style={{ "--i": 2, "--j": 23 }}
            >
              <input type="password" id="password" required />
              <label>Password</label>
            </div>
            <button
              type="submit"
              className="btn animation"
              style={{ "--i": 3, "--j": 24 }}
            >
              Login
            </button>
            <div
              className="logreg-link animation"
              style={{ "--i": 4, "--j": 25 }}
            >
              <p>
                Don't have an account?{" "}
                <a href="#" className="register-link" onClick={toggleForm}>
                  Create One
                </a>
              </p>
              <p>
                Forgot Password? <a href="#" className="register-link" />
              </p>
            </div>
          </form>
        </div>

        {/* Login Info Text */}
        <div className="info-text login">
          <h2 className="animation" style={{ "--i": 0, "--j": 20 }}>
            Welcome Back!
          </h2>
        </div>

        {/* Register Form */}
        <div className="form-box register">
          <h2 className="animation" style={{ "--i": 0, "--j": 21 }}>
            Sign Up
          </h2>
          <form action="#">
            <div
              className="input-box animation"
              style={{ "--i": 1, "--j": 22 }}
            >
              <input type="text" id="Username_reg" required />
              <label>Username</label>
            </div>
            <div
              className="input-box animation"
              style={{ "--i": 2, "--j": 23 }}
            >
              <input type="email" id="email" required />
              <label>Email</label>
            </div>
            <div
              className="input-box animation"
              style={{ "--i": 3, "--j": 24 }}
            >
              <input type="password" id="password" required />
              <label>Password</label>
            </div>
            <button
              type="submit"
              className="btn animation"
              style={{ "--i": 4, "--j": 25 }}
            >
              Create Account
            </button>
            <div
              className="logreg-link animation"
              style={{ "--i": 5, "--j": 26 }}
            >
              <p>
                Already have an account?{" "}
                <a href="#" className="login-link" onClick={toggleForm}>
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Register Info Text */}
        <div className="info-text register">
          <h2 className="animation" style={{ "--i": 0, "--j": 20 }}>
            Join Us Now!
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
