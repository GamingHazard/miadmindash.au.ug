import React, { useState, useContext } from "react";
import "./styles.css"; // Ensure the updated styles are linked
import "w3-css/w3.css";
import { CircularProgress } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { Configs } from "../components/Configs";
import { AuthContext } from "../context/AuthContext";
const AuthPage = () => {
  const { register, login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [names, setNames] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [password, setPassword] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [Erro, setErro] = useState(true);
  const [ErroMsg, setErroMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const registerAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Validate inputs
      if (!names || !email || !contact || !password) {
        alert("Please fill in all the fields to register.");
        setLoading(false); // Stop loading
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
        const token = response.data.token;
        const id = response.data.id;
        const profile = response.data.data;

        register(token, id, profile);
      }
    } catch (error) {
      console.log(error.message);
      setErro(true);
      setErroMsg(error.message);
    }
    setLoading(false);
  };

  const loginAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Validate inputs
    if (!identifier || !password) {
      alert("Please fill in all the fields to login.");
      setLoading(false); // Stop loading
      return;
    }
    try {
      const formData = { identifier: identifier, password: password };
      const response = await axios.post(`${Configs.url}/admin-login`, formData);

      if (response.status === 200) {
        console.log(response.data);
        const token = response.data.token;
        const id = response.data.id;
        const profile = response.data.user;

        // Call register from AuthContext
        login(token, id, profile);
      }
    } catch (error) {
      console.log(error.message);
      setErro(true);
      setErroMsg(error.message);
    } finally {
      setLoading(false);
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
              autoFocus
              onChange={(e) => {
                setIdentifier(e.target.value);
              }}
              type="text"
              required
              style={{ color: "black" }}
            />
            <label>Email/Contact</label>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="input-box animation"
          >
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type={isVisible ? "text" : "password"}
              required
              style={{ color: "black" }}
            />
            <Visibility
              onClick={() => {
                setIsVisible(false);
              }}
              className="w3-ripple"
              style={{
                display: !isVisible ? "none" : "block",
                cursor: "pointer",
                color: "black",
                marginLeft: 15,
              }}
            />
            <VisibilityOff
              style={{
                display: !isVisible ? "block" : "none",
                cursor: "pointer",
                cursor: "pointer",
                color: "black",
                marginLeft: 15,
              }}
              onClick={() => {
                setIsVisible(true);
              }}
            />
            <label>Password</label>
          </div>
          <button type="submit" onClick={loginAdmin} className="btn animation">
            {loading ? (
              <span
                style={{ display: "flex", flex: 1, justifyContent: "center" }}
              >
                loging in...{" "}
                <CircularProgress
                  style={{ marginLeft: 15 }}
                  color="white"
                  size={20}
                />
              </span>
            ) : (
              "Login"
            )}
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
        <h2 style={{ color: "white" }} className="animation">
          <b>Welcome Back!</b>
        </h2>
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="input-box animation"
          >
            <input
              onChange={(e) => setCreatePassword(e.target.value)}
              type={isVisible ? "text" : "password"}
              required
            />
            <Visibility
              onClick={() => {
                setIsVisible(false);
              }}
              className="w3-ripple"
              style={{
                display: !isVisible ? "none" : "block",
                cursor: "pointer",
                color: "black",
                marginLeft: 15,
              }}
            />
            <VisibilityOff
              style={{
                display: !isVisible ? "block" : "none",
                cursor: "pointer",
                cursor: "pointer",
                color: "black",
                marginLeft: 15,
              }}
              onClick={() => {
                setIsVisible(true);
              }}
            />
            <label>Create Password</label>
          </div>
          <div className="input-box animation">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type={isVisible ? "text" : "password"}
              required
              disabled={!createPassword}
            />

            <label>Confirm Password</label>
          </div>

          {/* Button */}
          <button
            onClick={registerAdmin}
            type="submit"
            className="btn animation"
            disabled={!names || !email || !contact || !password}
          >
            {loading ? (
              <span style={{ display: "flex", justifyContent: "center" }}>
                creating account...
                <CircularProgress
                  style={{ marginLeft: 15 }}
                  color="white"
                  size={20}
                />
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
      </div>

      <div className="info-text register">
        <h2 className="animation">
          <b>Join Us Now!</b>
        </h2>
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
