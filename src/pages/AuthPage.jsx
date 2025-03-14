import React, { useState } from "react";
import "./styles.css"; // Ensure the updated styles are linked
import "w3-css/w3.css";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { Configs } from "../components/Configs";
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [names, setNames] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [password, setPassword] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [Erro, setErro] = useState(true);
  const [ErroMsg, setErroMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [isVisible, setisVisible] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const register = async () => {
    setLoading(true);
    try {
      // Validate inputs
      if (!names || !email || !contact || !password) {
        alert("Please fill in all the fields to register.");
        setLoadingRegister(false); // Stop loading
        return;
      }

      const formData = {
        names: names,
        email: email,
        contact: contact,
        password: password,
      };

      const response = await axios.post(
        `${Configs.url}/register-admin`,
        formData
      );

      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.message);
      setErro(true);
      setErroMsg(error.message);
    }
    setLoading(false);
  };

  const login = async () => {
    // Validate inputs
    if (!identifier || !password) {
      alert("Please fill in all the fields to login.");
      setLoadingRegister(false); // Stop loading
      return;
    }
    try {
      const formData = { identifier: identifier, password: password };
      const response = await axios.post(`${Configs.url}/admin-login`, formData);

      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.message);
      setErro(true);
      setErroMsg(error.message);
    }
  };

  return (
    <div className={`wrapper ${isLogin ? "" : "active"}`}>
      <span className="bg-animate" />
      <span className="bg-animate2" />

      {/* LOGGING IN ADMIN */}
      <div className="form-box login">
        <h2 className="animation">Login</h2>
        <form>
          <div className="input-box animation">
            <input
              onChange={(e) => {
                setIdentifier(e.target.value);
              }}
              type="text"
              required
            />
            <label>Email/Contact</label>
          </div>
          <div className="input-box animation">
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              required
            />
            <label>Password</label>
          </div>
          <button type="submit" className="btn animation">
            {/* <CircularProgress color="white" size={20} /> */}
            Login
          </button>
          <div className="logreg-link animation">
            <p>
              Don't have an account?{" "}
              <a href="#" onClick={toggleForm}>
                Create One
              </a>
            </p>
            <p>
              Forgot Password? <a href="#">Recover</a>
            </p>
          </div>
        </form>
      </div>

      <div className="info-text login">
        <h2 className="animation">Welcome Back!</h2>
      </div>

      {/* REGISTERING ADMIN */}
      <div className="form-box register">
        {/* <h2 className="animation">Sign Up</h2> */}
        <form>
          <div className="input-box animation">
            <input
              onChange={(e) => setNames(e.target.value)}
              type="text"
              required
            />
            <label>Names</label>
          </div>
          <div className="input-box animation">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
            <label>Email</label>
          </div>
          <div className="input-box animation">
            <input
              onChange={(e) => setContact(e.target.value)}
              type="text"
              required
            />
            <label>Contact</label>
          </div>
          <div className="input-box animation">
            <input
              onChange={(e) => setCreatePassword(e.target.value)}
              type="password"
              required
            />
            <label>Create Password</label>
          </div>
          <div className="input-box animation">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
            <label>Confirm Password</label>
          </div>
          <button onClick={register} type="submit" className="btn animation">
            Create Account
          </button>
        </form>
      </div>

      <div className="info-text register">
        <h2 className="animation">Join Us Now!</h2>
        <div className="logreg-link animation">
          <p>
            Already have an account?{" "}
            <a href="#" onClick={toggleForm}>
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
