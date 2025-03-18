import React, { useState, useContext } from "react";
import "./styles.css"; // Ensure the updated styles are linked
import "w3-css/w3.css";
import { CircularProgress } from "@mui/material";
import { Visibility, VisibilityOff, Close } from "@mui/icons-material";
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
  const [resetCode, setResetCode] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [Erro, setErro] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [ErroMsg, setErroMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [resetForm, setResetForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState(false);
  const [verifyFeild, setVerifyFeild] = useState(false);
  // ErroMsgs
  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [contactErr, setContactErr] = useState(false);
  const [easswordErr, setPasswordErr] = useState(false);
  const [identifierErr, setIdentifierErr] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  const registerAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validation regex patterns
      const namePattern = /^[A-Za-z]+(?:\s{1,2}[A-Za-z]+)*$/; // Allows letters and max 2 spaces between words
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Valid email format
      const contactPattern = /^[0-9]{10}$/; // Exactly 10 digits
      const passwordMinLength = 6;

      // Validate Names
      if (!names || !namePattern.test(names.trim())) {
        setNameErr(true);
        setLoading(false);
        return;
      }

      // Validate Email
      if (!email || !emailPattern.test(email.trim())) {
        setEmailErr(true);
        setLoading(false);
        return;
      }

      // Validate Contact
      if (!contact || !contactPattern.test(contact.trim())) {
        setContactErr(true);
        setLoading(false);
        return;
      }

      // Validate Password
      if (!password || password.length < passwordMinLength) {
        setPasswordErr;
        setLoading(false);
        return;
      }

      // Create form data
      const formData = { names, email, contact, password };

      // Send data to API
      const response = await axios.post(
        `${Configs.url}/register-admin`,
        formData
      );

      if (response.status === 200) {
        console.log(response.data);
        const { token, id, data: profile } = response.data;

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

    // Validation regex patterns
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Valid email format
    const contactPattern = /^[0-9]{10}$/; // Exactly 10 digits

    // Validate Identifier (must be email or 10-digit number)
    if (
      !identifier ||
      (!emailPattern.test(identifier.trim()) &&
        !contactPattern.test(identifier.trim()))
    ) {
      setIdentifierErr(true);
      setLoading(false);
      return;
    }

    // Validate Password
    if (!password) {
      alert("Please enter your password.");
      setLoading(false);
      return;
    }

    try {
      const formData = { identifier: identifier.trim(), password };
      const response = await axios.post(`${Configs.url}/admin-login`, formData);

      if (response.status === 200) {
        const { token, id, user: profile } = response.data;

        // Call login from AuthContext
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

  // function for requesting password reset code
  const getCode = async (e) => {
    setLoading(true);
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please provide a valid email address.");
      setLoading(false);
      return;
    }
    const data = { email: email?.trim() };
    try {
      const response = await axios.post(`${Configs.url}/get-code`, data);
      if (response.status === 200) {
        setSuccessMsg(true);
        setVerifyFeild(true);
      }
    } catch (error) {
      setErro(true);
      if (error.message === "Request failed with status code 404") {
        setErroMsg("sorry!, email address not found");
      } else {
        setErroMsg(
          "Failed to send the code, please check the email and try again "
        );
      }

      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  // function for verifying the code
  const verifyCode = async (e) => {
    setLoading2(true);
    const data = { email: email?.trim(), code: resetCode?.trim() };
    console.log(data);

    try {
      const response = await axios.post(`${Configs.url}/verify-code`, data);
      if (response.status === 200) {
        setResetToken(response.data.resetToken);
        setUserID(response.data.user.id);
        setPasswordForm(true);
      }
      // Redirect to reset password page
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      setLoading2(false);
    }
  };

  const resetPassword = async (e) => {
    setLoading(true);
    try {
      const data = { token: resetToken, newPassword: password };

      const response = await axios.post(`${Configs.url}/reset-password`, data);

      if (response.status === 200) {
        setResetForm(false);
      }
    } catch (error) {
      setPasswordMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {" "}
      {resetForm ? (
        // RESETTING PASSWORD
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            position: "relative",
          }}
          className="wrapper"
        >
          <Close
            onClick={() => {
              setResetForm(false);
            }}
            className="w3-ripple w3-right"
            style={{
              cursor: "pointer",
              color: "crimson",

              position: "absolute",
              right: 15,
              top: 15,
            }}
          />
          {/* PASSWORD RESET FORM */}
          {passwordForm ? (
            <div style={{ width: "70%" }}>
              {" "}
              <p>A code will be sent to your email</p>
              <br />
              <input
                onChange={(e) => {
                  setCreatePassword(e.target.value);
                }}
                style={{ padding: 10, width: "100%" }}
                autoFocus
                type="email"
                placeholder="create new password"
              />
              <br />
              <br />
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                style={{ padding: 10, width: "100%" }}
                autoFocus
                type="email"
                placeholder="confirm password"
                disabled={!createPassword}
              />
              <br />
              <br />
              <button
                onClick={resetPassword}
                disabled={!password}
                style={{ padding: 10 }}
                type="submit"
              >
                {loading2 ? (
                  <span style={{ display: "flex" }}>
                    changing password...{" "}
                    <CircularProgress
                      style={{ marginLeft: 15 }}
                      color="black"
                      size={20}
                    />
                  </span>
                ) : (
                  "change password"
                )}
              </button>
            </div>
          ) : (
            // PASSWORD RESET CODE FORM
            <div style={{ width: "70%" }}>
              {" "}
              <p>A code will be sent to your email</p>
              <br />
              <span style={{ display: "flex", width: "100%" }}>
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  style={{ padding: 10, flex: 1, marginRight: 10 }}
                  autoFocus
                  type="email"
                  placeholder="Enter your email address"
                />
                <button
                  onClick={getCode}
                  disabled={!email}
                  style={{ padding: 10 }}
                  type="submit"
                >
                  {loading ? (
                    <span style={{ display: "flex" }}>
                      sending Code...{" "}
                      <CircularProgress
                        style={{ marginLeft: 15 }}
                        color="black"
                        size={20}
                      />
                    </span>
                  ) : (
                    "Send code"
                  )}
                </button>
              </span>
              {successMsg ? (
                <span style={{ color: "teal" }}>
                  A 6 digit code has been sent to your email.{" "}
                  <a onClick={getCode}>
                    <b
                      className="w3-ripple"
                      style={{
                        color: "royalblue",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      Click here
                    </b>{" "}
                    to resend the code
                  </a>
                </span>
              ) : Erro ? (
                <span style={{ color: "crimson" }}>{ErroMsg} </span>
              ) : (
                ""
              )}
              <br />
              <br />
              <input
                onChange={(e) => {
                  setResetCode(e.target.value);
                }}
                style={{ padding: 10, width: "100%" }}
                autoFocus
                type="email"
                placeholder="Enter code"
                disabled={!verifyFeild}
              />
              <br />
              <br />
              <button
                onClick={verifyCode}
                disabled={!resetCode}
                style={{ padding: 10 }}
                type="submit"
              >
                {loading2 ? (
                  <span style={{ display: "flex" }}>
                    Verifying Code...{" "}
                    <CircularProgress
                      style={{ marginLeft: 15 }}
                      color="black"
                      size={20}
                    />
                  </span>
                ) : (
                  "Verify code"
                )}
              </button>
            </div>
          )}
        </div>
      ) : (
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
              <button
                type="submit"
                onClick={loginAdmin}
                className="btn animation"
              >
                {loading ? (
                  <span
                    style={{
                      display: "flex",
                      flex: 1,
                      justifyContent: "center",
                    }}
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
                  Forgot Password?{" "}
                  <a
                    onClick={() => {
                      setResetForm(true);
                    }}
                    href="#"
                  >
                    Recover
                  </a>
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
                <br />
                <span style={{ color: "crimson" }}>
                  {nameErr
                    ? "special characters are not allowed in this feild"
                    : ""}
                </span>
                <label>Names</label>
              </div>
              <div className="input-box animation">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                />
                <br />
                <span style={{ color: "crimson" }}>
                  {emailErr ? "enter a valid email address" : ""}
                </span>

                <label>Email</label>
              </div>
              <div className="input-box animation">
                <input
                  onChange={(e) => setContact(e.target.value)}
                  type="text"
                  required
                />
                <br />
                <span style={{ color: "crimson" }}>
                  {nameErr ? "enter a valid phonr number" : ""}
                </span>

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
                    color: "white",
                    marginLeft: 15,
                  }}
                />
                <VisibilityOff
                  style={{
                    display: !isVisible ? "block" : "none",
                    cursor: "pointer",
                    cursor: "pointer",
                    color: "white",
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
                  style={{
                    color: password !== createPassword ? "crimson" : "",
                    borderBottomColor:
                      password !== createPassword ? "crimson" : "",
                  }}
                />
                <br />
                <span style={{ color: "crimson" }}>
                  {password !== createPassword ? "passwords don`t match!" : ""}
                </span>

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
      )}
    </div>
  );
};

export default AuthPage;
